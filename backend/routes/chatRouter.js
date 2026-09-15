import express from "express";
import client from "../config/db.js";
import bcrypt from "bcrypt";
import { ObjectId } from "mongodb";

import authenticateToken from "../middleware/authenticateToken.js";

const router = express.Router();

router.get("/history", authenticateToken, async (req, res) => {
  const userId = req.userId;
  try {
    const collection = client.db("recipe_ai").collection("chats");
    const result = await collection
      .find({ userId: userId })
      .sort({ updatedAt: -1 })
      .toArray();
    res.status(200);
    res.send({ data: result });
  } catch (error) {
    // console.log(error);
    res.status(500).json({ error: "Failed to fetch chat history" });
  }
});

router.get("/:chatId", authenticateToken, async (req, res) => {
  const userId = req.userId;
  const { chatId } = req.params;

  try {
    const collection = client.db("recipe_ai").collection("chats");
    const chat = await collection.findOne({
      _id: new ObjectId(chatId),
      userId: userId,
    });

    res.status(200);
    res.send({ data: chat });
  } catch (error) {
    res.status(500);
    res.send({ error: "Failed to fetch chat" });
  }
});

router.delete("/:chatId", authenticateToken, async (req, res) => {
  const userId = req.userId;
  const { chatId } = req.params;
  try {
    const collection = client.db("recipe_ai").collection("chats");
    const result = collection.deleteOne({
      _id: new ObjectId(chatId),
      userId: userId,
    });
    res.status(200);
    res.send({ message: "Chat deleted successfully" });
  } catch (error) {
    res.status(500);
    res.send({ error: "Failed to delete chat" });
  }
});

export default router;
