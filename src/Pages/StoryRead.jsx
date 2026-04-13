import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { FaRegBookmark, FaBookmark } from "react-icons/fa";
import "../style/StoryRead.css";

export default function StoryRead() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [story, setStory] = useState(null);
  const [saved, setSaved] = useState(false);
  const [recommended, setRecommended] = useState([]);
  const [summary, setSummary] = useState("");
  const [loadingSummary, setLoadingSummary] = useState(false);

  const email = localStorage.getItem("userEmail");
  const userId = email?.split("@")[0];

  useEffect(() => {
    fetch(`http://localhost:5000/api/stories/${id}`)
      .then(res => res.json())
      .then(data => {
        setStory(data);
        fetchOtherStories(data.category);
      });

    if (userId) {
      fetch(`http://localhost:5000/api/saved/check/${userId}/${id}`)
        .then(res => res.json())
        .then(data => setSaved(data.isSaved))
        .catch(() => setSaved(false));
    }
  }, [id, userId]);

  const handleSummary = async () => {
    setLoadingSummary(true);

    const res = await fetch("http://localhost:5000/api/ai/summary", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        content: story.content,
        title: story.title,
      }),
    });

    const data = await res.json();
    setSummary(data.summary);
    setLoadingSummary(false);
  };


  const fetchOtherStories = async (currentCategory) => {
    const res = await fetch("http://localhost:5000/api/stories/feed/" + userId);
    const data = await res.json();

    const filtered = data.filter(
      s => s._id !== id && s.category !== currentCategory
    );

    setRecommended(filtered.slice(0, 3));
  };

  const toggleSave = async () => {
    if (!userId) {
      alert("Please login to save stories");
      return;
    }

    const res = await fetch("http://localhost:5000/api/saved/toggle", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId, storyId: id })
    });

    const data = await res.json();
    setSaved(data.saved);
  };

  if (!story) return <h2>Loading...</h2>;

  return (
    <div className="story-read">
      {/* STORY */}
      <div className="story-header">
        <h1>{story.title}</h1>

        <span className={`save-icon ${saved ? "active" : ""}`} onClick={toggleSave}>
          {saved ? <FaBookmark /> : <FaRegBookmark />}
        </span>
      </div>

      <p className="meta">
        {story.category} • {story.author}
      </p>

      <div className="divider" />

      <div className="summary-section">
        <button className="summary-btn" onClick={handleSummary}>
          {loadingSummary ? "Generating..." : "📄 Show Summary"}
        </button>

        {summary && (
          <>
            <div className="summary-box">
              <h3>📌 Quick Summary</h3>
              <p>{summary}</p>
            </div>

            <div className="divider" />
          </>
        )}
      </div>

      <p className="content">{story.content}</p>

      {recommended.length > 0 && (
        <>
          <h3 className="recommend-title">Explore Something Different</h3>

          <div className="recommend-grid">
            {recommended.map(rec => (
              <div
                key={rec._id}
                className="recommend-card"
                onClick={() => navigate(`/story/${rec._id}`)}
              >
                <h4>{rec.title}</h4>
                <p>{rec.category} • {rec.author}</p>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
