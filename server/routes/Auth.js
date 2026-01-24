const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../model/User.js");
const UserPreference = require("../model/UserPreference");


const router = express.Router();

// REGISTER
router.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const prefix = email.split("@")[0];

    const hashed = await bcrypt.hash(password, 10);

    const user = new User({
      _id: prefix,
      name,
      email,
      password: hashed
    });

    await user.save();
    res.json({ msg: "User registered successfully" });

  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
});

// LOGIN
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ msg: "User not found" });

    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(400).json({ msg: "Wrong password" });

    const token = jwt.sign(
      { id: user._id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    const { password: _, ...data } = user._doc;
const pref = await UserPreference.findById(user._id);

const isPreferenceSelected = pref?.isPreferenceSelected || false;

  res.json({
  success: true,
  token,
  user: {
    ...data,
    isPreferenceSelected
  }
});


  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
