import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import authRouter from "./routes/authRouter.js";
import aiRouter from "./routes/aiRouter.js";
import chatRouter from "./routes/chatRouter.js";
import { connectDB } from "./config/db.js";
dotenv.config();

const app = express();

app.use(
  cors({
    origin: "https://recipe-ai-v3-0.vercel.app",
  }),
);
app.use(express.json());
const router = express.Router();

const PORT = process.env.PORT || 3000;

// const authRouter = require("./routes/authRouter");
// const aiRouter = require("./routes/aiRouter");

app.use("/api/auth", authRouter);
app.use("/api/ai", aiRouter);
app.use("/api/chats", chatRouter);

const initializServer = async () => {
  await connectDB();
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
};

initializServer();

export default app;
