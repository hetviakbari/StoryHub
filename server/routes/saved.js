const express = require("express");
const SavedStory = require("../model/SavedStory");

const router = express.Router();

// CHECK IF SAVED
router.get("/check/:userId/:storyId", async (req, res) => {
  try {
    const { userId, storyId } = req.params;

    const saved = await SavedStory.findById(userId);
    const isSaved = saved?.stories.includes(storyId) || false;

    res.json({ isSaved });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// TOGGLE SAVE / UNSAVE
router.post("/toggle", async (req, res) => {
  try {
    const { userId, storyId } = req.body;

    let saved = await SavedStory.findById(userId);

    if (!saved) {
      saved = new SavedStory({
        _id: userId,
        stories: [storyId]
      });
      await saved.save();
      return res.json({ saved: true });
    }

    const index = saved.stories.indexOf(storyId);

    if (index === -1) {
      saved.stories.push(storyId); 
      await saved.save();
      res.json({ saved: true });
    } else {
      saved.stories.splice(index, 1); 
      await saved.save();
      res.json({ saved: false });
    }

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
