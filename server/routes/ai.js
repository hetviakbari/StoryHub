const express = require("express");
const router = express.Router();
const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

router.post("/enhance", async (req, res) => {
  try {
    const { content } = req.body;

    if (!content) {
      return res.status(400).json({ error: "Content is required" });
    }

    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const prompt = `Improve this story with better grammar, creativity, and clarity:\n\n${content}`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const enhanced = response.text();

    res.json({ enhanced });

  } catch (err) {
    console.error("GEMINI ERROR:", err.message);
    res.status(500).json({ error: "AI failed" });
  }
});

module.exports = router;