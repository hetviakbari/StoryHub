const mongoose = require("mongoose");

const SavedStorySchema = new mongoose.Schema({
  _id: String, 
  stories: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Story"
  }]
});

module.exports = mongoose.model("SavedStory", SavedStorySchema);
