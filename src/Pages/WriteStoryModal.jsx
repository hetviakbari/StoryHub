import { useState } from "react";
import "../Style/WriteStoryModal.css";
import API from "../services/api";

// Topics Data
const topicsData = {
  Life: ["Personal Growth", "Mental Health", "Productivity", "Travel", "Creativity"],
  Technology: ["AI", "Web Development", "Software Engineering", "Cybersecurity", "Data Science"],
  Relationships: ["Dating", "Marriage", "Friendship", "Family"],
  Education: ["Learning", "Higher Education", "Study Tips", "Online Learning"],
  Professional: ["Business", "Entrepreneurship", "Marketing", "Leadership"],
};

export default function WriteStoryModal({ closeModal }) {

  const [story, setStory] = useState({
    title: "",
    category: "",
    subCategory: "",
    content: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) =>
    setStory({ ...story, [e.target.name]: e.target.value });

  const enhanceStory = async () => {
    if (!story.content) {
      alert("Write something first!");
      return;
    }

    try {
      setLoading(true);

      const res = await API.post("/ai/enhance", {
        content: story.content,
        title: story.title
      });

      setStory({ ...story, content: res.data.enhanced });

    } catch (err) {
      console.error(err);
      alert("AI failed");
    } finally {
      setLoading(false);
    }
  };

  const publishStory = async () => {
    const email = localStorage.getItem("userEmail");
    const author = email ? email.split("@")[0] : "anonymous";

    const res = await API.post("/stories/create", {
      ...story,
      author: author,
      status: "published",
    });

    if (res.data.success) {
      alert("Story Published!");
      closeModal();
    }
  };

  return (
    <div className="modal-overlay">
      <div className="editor-modal">

        {/* Header */}
        <div className="editor-header">
          <h2>Write a Story</h2>
          <button className="close-btn" onClick={closeModal}>✖</button>
        </div>

        {/* Title */}
        <input
          name="title"
          className="story-title"
          placeholder="Story Title..."
          onChange={handleChange}
        />

        {/* Category */}
        <select
          name="category"
          className="story-category"
          onChange={(e) => {
            handleChange(e);
            setStory({ ...story, category: e.target.value, subCategory: "" });
          }}
        >
          <option value="">Select Category</option>
          {Object.keys(topicsData).map((cat) => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>

        {/* Sub Category */}
        {story.category && (
          <select
            name="subCategory"
            className="story-category"
            onChange={handleChange}
          >
            <option value="">Select Topic</option>
            {topicsData[story.category].map((sub) => (
              <option key={sub} value={sub}>{sub}</option>
            ))}
          </select>
        )}

        {/* Content */}
        <textarea
          name="content"
          className="story-editor"
          placeholder="Tell your story..."
          rows="10"
          value={story.content}
          onChange={handleChange}
        ></textarea>

        <div className="editor-footer">

          <button onClick={enhanceStory} className="draft-btn" disabled={loading}>
            {loading ? "Enhancing..." : "✨ Enhance with AI"}
          </button>

          <button className="publish-btn" onClick={publishStory}>
            Publish
          </button>

        </div>

      </div>
    </div>
  );
}