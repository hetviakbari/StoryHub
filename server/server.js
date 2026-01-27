const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const preferenceRoutes = require ("./routes/preferenceRoutes.js");
const authRoutes = require("./routes/AuthRoutes.js");
const storyRoutes = require("./routes/StoryRoutes");
const savedRoutes = require("./routes/saved");



const app = express();

app.use(cors());
app.use(express.json());
app.use("/api/auth", authRoutes);
app.use("/api/preferences", preferenceRoutes);
app.use("/api/stories", storyRoutes);
app.use("/api/saved", savedRoutes);


app.get("/", (req, res) => {
  res.send("StoryHub API Running");
});

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    console.log("MongoDB Connected");
    
    app.listen(5000, () => {
      console.log("Server running on port 5000");
    });
  })
  .catch(err => console.log(err));
