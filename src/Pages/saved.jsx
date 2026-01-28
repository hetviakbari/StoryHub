import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Saved() {
  const [savedStories, setSavedStories] = useState([]);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
const email = localStorage.getItem("userEmail");
  const userId = email?.split("@")[0];
  console.log("userID : "+userId);
    const fetchSavedStories = async () => {
      try {
        const res = await fetch(
          `http://localhost:5000/api/stories/saved/${userId}`
        );
        const data = await res.json();

        // ✅ handle both array & object response
        setSavedStories(data.savedStories || data || []);
      } catch (error) {
        console.error("Failed to fetch saved stories", error);
        setSavedStories([]);
      } finally {
        setLoading(false);
      }
    };

    fetchSavedStories();
  }, []);

  return (
    <div className="main-content">
      <h3>Saved Stories</h3>

      <div className="story-grid">
        {loading ? (
          <p>Loading saved stories...</p>
        ) : savedStories.length === 0 ? (
          <p>No saved stories yet ❤️</p>
        ) : (
          savedStories.map((story) => (
            <div
              key={story._id}
              className="story-card"
              onClick={() => navigate(`/story/${story._id}`)}
            >
              <h4>{story.title}</h4>
              <p>{story.subCategory} • {story.author}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
