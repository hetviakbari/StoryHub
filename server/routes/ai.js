const express = require("express");
const router = express.Router();
const OpenAI = require("openai");

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

router.post("/enhance", async (req, res) => {
  try {
    const { content } = req.body;

    if (!content) {
      return res.status(400).json({ error: "Content is required" });
    }

    const response = await client.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "user",
          content: `Improve this story with better grammar, creativity, and clarity:\n\n${content}`,
        },
      ],
    });

    const enhanced = response.choices[0].message.content;

    res.json({ enhanced });
  } catch (err) {
    console.error("AI ERROR:", err.message);
    res.status(500).json({ error: "AI failed" });
  }
});

module.exports = router;