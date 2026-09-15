import Groq from "groq-sdk";
import dotenv from "dotenv";
import express from "express";
import client from "../config/db.js";
import { ObjectId } from "mongodb";
import authenticateToken from "../middleware/authenticateToken.js";
dotenv.config();

const router = express.Router();

const groq = new Groq({ apiKey: process.env.API_KEY });

router.post("/chat", authenticateToken, async (req, res) => {
  const userId = req.userId;
  const { query, chatId } = req.body;
  try {
    const chatCompletion = await groq.chat.completions.create({
      messages: [
        {
          role: "system",
          content: `
                    You are Recipe.AI, a friendly, beginner-focused food and recipe assistant.

                    Scope:
                    - Only answer questions about recipes, cooking, ingredients, food preparation,
                      cooking techniques, meal ideas, substitutions, food storage/safety, and
                      nutrition related to specific foods or recipes.
                    - For greetings such as "hi" or "hello", respond briefly and invite the user
                      to ask about a recipe.
                    - For unrelated topics, politely say:
                      "Sorry buddy, I can assist only with recipes and food-related topics 🍳"
                    - Do not answer or engage in unrelated conversations.

                    Formatting:
                    - Use clean Markdown.
                    - Start with the recipe name as a heading.
                    - For recipes, use: Ingredients → Instructions → Cooking Time.
                    - Ingredients must be bullet points, one per line.
                    - Instructions must be numbered.
                    - Never use Markdown tables or HTML.
                    - Keep responses concise, clear, and beginner-friendly.
                `,
        },
        {
          role: "user",
          content: req.body.query,
        },
      ],
      model: "groq/compound-mini",
    });

    const assistantMessage = chatCompletion.choices[0].message;
    const collection = client.db("recipe_ai").collection("chats");
    // connection to MongoDB and saving the chat history

    if (chatId) {
      // updating the chat
      const userMessage = {
        role: "user",
        content: query,
      };
      const updatedChat = await collection.updateOne(
        {
          _id: new ObjectId(chatId),
          userId: userId,
        },
        {
          $push: {
            messages: {
              $each: [userMessage, assistantMessage],
            },
          },
          $set: {
            updatedAt: new Date(),
          },
        },
      );

      res.send({
        chatId: chatId,
        message: assistantMessage,
      });
    } else {
      const newChat = {
        userId,
        title: query,
        messages: [
          {
            role: "user",
            content: query,
          },
          {
            role: assistantMessage.role,
            content: assistantMessage.content,
          },
        ],
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      const result = await collection.insertOne(newChat);
      res.send({
        chatId: result.insertedId,
        message: assistantMessage,
      });
    }
  } catch (error) {
    // console.log(error);
    res
      .status(500)
      .send({ error: "An error occurred while processing your request." });
  }
});

export default router;
