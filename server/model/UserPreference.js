const mongoose = require("mongoose");

const userPreferenceSchema = new mongoose.Schema({
  _id: String,
  email: String,
  topics: [String],
  isPreferenceSelected: { type: Boolean, default: false }
});

module.exports = mongoose.model("UserPreference", userPreferenceSchema);
