const mongoose = require("mongoose");

const StorySchema = new mongoose.Schema({
  title: String,

  category: String,
  subCategory: String, 

  content: String,
  author: String,

  status: {
    type: String,
    default: "published",
  },
  

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Story", StorySchema);
