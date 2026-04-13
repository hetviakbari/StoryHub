const express = require("express");
const Story = require("../model/Story");
const SavedStory = require("../model/SavedStory");
const UserPreference = require("../model/UserPreference");

const router = express.Router();

router.post("/create", async (req, res) => {
  try {
    const { title, category, subCategory, content, author } = req.body;

    const newStory = new Story({
      title,
      category,
      subCategory,
      content,
      author,
      status: "published"
    });

    await newStory.save();

    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get("/feed/:userId", async (req, res) => {
  try {
    const userId = req.params.userId;

    const pref = await UserPreference.findById(userId);

    let stories = await Story.find();

    stories = stories.map((story) => {
      let score = 0;

      if (pref && pref.topics.includes(story.subCategory)) {
        score += 10;
      }

      if (pref && pref.topics.includes(story.category)) {
        score += 5;
      }

      const daysOld =
        (Date.now() - new Date(story.createdAt)) / (1000 * 60 * 60 * 24);

      if (daysOld < 2) score += 5;
      else if (daysOld < 7) score += 2;

      score += Math.random() * 3;

      return {
        ...story._doc,
        score,
      };
    });

    stories.sort((a, b) => b.score - a.score);

    res.json(stories);

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get("/saved/:userId", async (req, res) => {
  try {
    const { userId } = req.params;

    const saved = await SavedStory.findById(userId);

    if (!saved || saved.stories.length === 0) {
      return res.json([]);
    }

    // Fetch full story details
    const stories = await Story.find({
      _id: { $in: saved.stories },
    }).sort({ createdAt: -1 });

    res.json(stories);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const story = await Story.findById(req.params.id);

    if (!story) {
      return res.status(404).json({ message: "Story not found" });
    }

    res.json(story);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
