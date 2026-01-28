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

    let filter = {};

    if (pref && pref.topics && pref.topics.length > 0) {
      const regexTopics = pref.topics.map(t => new RegExp(`^${t}$`, "i"));
      filter = { subCategory: { $in: regexTopics } };
    }

    const stories = await Story.find(filter).sort({ createdAt: -1 });

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
