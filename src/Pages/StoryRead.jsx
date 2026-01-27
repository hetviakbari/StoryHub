import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { FaRegBookmark, FaBookmark } from "react-icons/fa";

export default function StoryRead() {
  const { id } = useParams();
  const [story, setStory] = useState(null);
  const [saved, setSaved] = useState(false);

  const email = localStorage.getItem("userEmail");
  const userId = email?.split("@")[0];

  useEffect(() => {
    fetch(`http://localhost:5000/api/stories/${id}`)
      .then(res => res.json())
      .then(data => setStory(data));

    if (userId) {
      fetch(`http://localhost:5000/api/saved/check/${userId}/${id}`)
        .then(res => res.json())
        .then(data => setSaved(data.isSaved))
        .catch(() => setSaved(false));
    }
  }, [id, userId]);

  const toggleSave = async () => {
    if (!userId) {
      alert("Please login to save stories");
      return;
    }

    try {
      const res = await fetch("http://localhost:5000/api/saved/toggle", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId, storyId: id })
      });

      const data = await res.json();
      setSaved(data.saved);
    } catch (err) {
      console.error(err);
    }
  };

  if (!story) return <h2>Loading...</h2>;

  return (
    <div className="story-read">
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

      <p className="content">{story.content}</p>
    </div>
  );
}
