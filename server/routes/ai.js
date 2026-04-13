const express = require("express");
const router = express.Router();
const OpenAI = require("openai");

const client = new OpenAI({
    apiKey: process.env.AI_API_KEY,
    baseURL: "https://openrouter.ai/api/v1",
});

router.post("/enhance", async (req, res) => {
    try {
        const { content, title } = req.body;

        if (!content) {
            return res.status(400).json({ error: "Content is required" });
        }
        const prompt = `
Acts asan expert content writer.

Title: ${title}

Story Content:
${content}

Instructions:
- Understand the title and context before improving the content
- If the title suggests questions (like interview questions), keep the question-answer format
- Improve grammar, clarity, and professionalism
- Make the content more engaging and structured
- Do NOT remove questions if they exist
- If answers are missing, add short and relevant answers
- Keep it clean and readable

Return only the improved version.
`;

        const completion = await client.chat.completions.create({
            model: "openai/gpt-3.5-turbo",
            messages: [
                {
                    role: "system",
                    content: "You are a helpful AI assistant for improving content.",
                },
                {
                    role: "user",
                    content: prompt,
                },
            ],
        });

        const enhanced = completion.choices[0].message.content;

        res.json({ enhanced });

    } catch (err) {
        console.error("AI ERROR:", err.message);
        res.status(500).json({ error: "AI failed" });
    }
});


router.post("/summary", async (req, res) => {
  try {
    const { content, title } = req.body;

    if (!content) {
      return res.status(400).json({ error: "Content required" });
    }

    const prompt = `
Summarize the following story in 4-5 short lines.

Title: ${title}
Content: ${content}

Make it:
- Short
- Clear
- Easy to read
- Engaging

Return only the summary.
`;

    const completion = await client.chat.completions.create({
      model: "openai/gpt-3.5-turbo",
      messages: [
        { role: "user", content: prompt }
      ],
    });

    const summary = completion.choices[0].message.content;

    res.json({ summary });

  } catch (err) {
    console.error("SUMMARY ERROR:", err.message);
    res.status(500).json({ error: "Summary failed" });
  }
});

module.exports = router;