const express = require("express");
const UserPreference = require("../model/UserPreference.js");
const { getEmailPrefix } = require("../email/emailprefix.js");

const router = express.Router();

router.post("/save", async (req, res) => {
  try {
    const { email, topics } = req.body;
    const userId = getEmailPrefix(email);
    console.log("Saving preferences for userId:", userId);
    console.log("Topics:", topics);

    const pref = await UserPreference.findByIdAndUpdate(
      userId,
      { email, topics, isPreferenceSelected: topics.length > 0 },
      { new: true, upsert: true }
    );

    res.json({ success: true, pref });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
