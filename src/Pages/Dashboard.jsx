import "../Style/Dashboard.css";
import { useEffect, useState } from "react";
import logo from "../Photos/logo.png";
import WriteStoryModal from "./WriteStoryModal.jsx";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const [name, setName] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [stories, setStories] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    const email = localStorage.getItem("userEmail");
    const userId = localStorage.getItem("userId");
    console.log("Dashboard mounted for user:", email, "with ID:", userId);
    const fetchUser = async () => {
      const res = await fetch(
        `http://localhost:5000/api/auth/${email}`
      );
      const data = await res.json();
      console.log("Fetched user data:", data);
      setName(data.name);
    };

    const fetchStories = async () => {
      const res = await fetch(
        `http://localhost:5000/api/stories/feed/${userId}`
      );
      const data = await res.json();
      setStories(data);
    };

    fetchUser();
    fetchStories();
  }, []);

  return (
    <div className="dashboard-container">
      <main className="main-content">
        <div className="topbar">
          <h2>
            Welcome back, <span>{name}</span>
          </h2>
          <button className="write-btn" onClick={() => setShowModal(true)}>
            + Write Story
          </button>
        </div>

        <div className="stats-grid">
          <div className="stat-card">📖 Stories Read <p>12</p></div>
          <div className="stat-card">❤️ Liked Stories <p>8</p></div>
          <div className="stat-card">💾 Saved <p>4</p></div>
        </div>

        <div className="story-section">
          <h3>Recommended for You</h3>

          <div className="story-grid">
            {stories.length === 0 ? (
              <p>No stories found 😔</p>
            ) : (
              stories.slice(0, 6).map((story) => (
                <div
                  key={story._id}
                  className="story-card"
                  onClick={() => navigate(`/story/${story._id}`)}
                >
                  <h4>{story.title}</h4>
                  <p>
                    {story.subCategory} • {story.author}
                  </p>
                </div>
              ))
            )}
          </div>
          <button
            className="explore-btn"
            onClick={() => navigate("/explore")}
          >
            Explore More →
          </button>

        </div>
      </main>

      {showModal && <WriteStoryModal closeModal={() => setShowModal(false)} />}
    </div>
  );
}
