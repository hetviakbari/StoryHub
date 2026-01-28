import "../Style/Dashboard.css";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Explore() {
  const [stories, setStories] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const userId = localStorage.getItem("userId");

    fetch(`http://localhost:5000/api/stories/feed/${userId}`)
      .then(res => res.json())
      .then(data => setStories(data));
  }, []);

  return (
    <div className="main-content">
      <h3>Explore More Stories</h3>

      <div className="story-grid">
        {stories.slice(6).map(story => (
          <div
            key={story._id}
            className="story-card"
            onClick={() => navigate(`/story/${story._id}`)}
          >
            <h4>{story.title}</h4>
            <p>{story.subCategory} • {story.author}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
