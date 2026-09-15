import googleClient from "../utils/googleConfig.js";
import client from "../config/db.js";
import jwt from "jsonwebtoken";

const googleLogin = async (req, res) => {
  // console.log("🔥 GOOGLE CONTROLLER HIT");
  // console.log("BODY:", req.body);
  try {
    const { code } = req.body;
    const googleResponse = await googleClient.getToken(code);

    googleClient.setCredentials(googleResponse.tokens);

    const userResponse = await fetch(
      `https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${googleResponse.tokens.access_token}`,
    );

    const userData = await userResponse.json();

    const { email, name, picture } = userData;
    const collection = client.db("recipe_ai").collection("users");
    let user = await collection.findOne({ email });
    if (!user) {
      user = await collection.insertOne({
        name,
        email,
        image: picture,
      });
    }
    const { _id } = user;

    const token = jwt.sign({ _id, email }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_TIMEOUT,
    });

    // console.log(user);

    return res.status(200).json({
      message: "Success",
      token,
      user,
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal server error",
    });
  }
};

export default googleLogin;
