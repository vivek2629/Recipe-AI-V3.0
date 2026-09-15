import jwt from "jsonwebtoken";

const authenticateToken = (req, res, next) => {
  let jwtToken;
  const authHeader = req.headers["authorization"];
  if (authHeader !== undefined) {
    jwtToken = authHeader.split(" ")[1];
  }
  if (jwtToken === undefined) {
    res.status(401).json({
      error: "Invalid JWT Token",
    });
  } else {
    jwt.verify(jwtToken, process.env.JWT_SECRET, async (error, payload) => {
      if (error) {
        res.status(401).json({
          error: "Invalid JWT Token",
        });
      } else {
        req.userId = payload.userId;
        // console.log("Middleware userId:", req.userId);
        next();
      }
    });
  }
};

export default authenticateToken;
