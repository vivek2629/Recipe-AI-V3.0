import express from "express";
import client from "../config/db.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import googleLogin from "../controllers/authController.js";

const router = express.Router();

router.post("/signup", async (req, res) => {
  try {
    const collection = client.db("recipe_ai").collection("users");
    const userDetails = req.body;
    const { email } = userDetails;
    const isUserExist = await collection.find({ email }).toArray();
    if (isUserExist.length === 0) {
      const hashedPassword = await bcrypt.hash(userDetails.password, 10);
      userDetails.password = hashedPassword;
      const result = await collection.insertOne(userDetails);
      res.status(200);
      res.send({
        yourId: result.insertedId,
        message: "User registered successfuly",
      });
    } else {
      res.status(401);
      res.send({ errorMsg: "User with this Email ID already exists" });
    }
  } catch (error) {
    // console.error("Error during signup:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

router.post("/login", async (req, res) => {
  try {
    const collection = client.db("recipe_ai").collection("users");
    const userDetails = req.body;
    const { email, password } = userDetails;
    const isUserExist = await collection.findOne({ email });
    if (!isUserExist) {
      res.status(401);
      res.send({ errorMsg: "User with this Email ID doesn't exist" });
    }
    const isPassWordMatched = await bcrypt.compare(
      password,
      isUserExist.password,
    );
    if (isPassWordMatched) {
      const token = jwt.sign(
        { userId: isUserExist._id },
        process.env.JWT_SECRET,
        { expiresIn: process.env.JWT_TIMEOUT },
      );
      res.status(200);
      res.send({ jwtToken: token, userId: isUserExist._id });
    } else {
      res.status(401);
      res.send({ errorMsg: "Incorrect password" });
    }
  } catch (error) {
    // console.error("Error during login:", error);
    res.status(500);
    res.send({ "Internal server error:": error });
  }
});

router.post("/google", googleLogin);

export default router;
