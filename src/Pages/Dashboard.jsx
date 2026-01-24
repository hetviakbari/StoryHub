import "../Style/Dashboard.css";
import { useEffect, useState } from "react";

export default function Dashboard() {
  const [emailPrefix, setEmailPrefix] = useState("");

  useEffect(() => {
    const prefix = localStorage.getItem("emailPrefix");
    if (prefix) setEmailPrefix(prefix);
  }, []);

  return (
    <div className="dashboard-container">
      {/* Sidebar */}
      <div className="dashboard-sidebar">
        <h2>📚 StoryHub</h2>
        <ul>
          <li>🏠 Home</li>
          <li>📝 Write Story</li>
          <li>❤️ Favorites</li>
          <li>⚙️ Settings</li>
          <li className="logout">🚪 Logout</li>
        </ul>
      </div>

      {/* Main Content */}
      <div className="dashboard-main">
        <h1>Welcome, {emailPrefix} 👋</h1>
        <p>Your personalized reading dashboard</p>

        {/* Cards */}
        <div className="dashboard-cards">
          <div className="card">
            <h3>📖 Recommended Stories</h3>
            <p>Stories based on your selected topics.</p>
            <button>Explore</button>
          </div>

          <div className="card">
            <h3>✍️ Create New Story</h3>
            <p>Start writing your own amazing story.</p>
            <button>Write Now</button>
          </div>

          <div className="card">
            <h3>🔥 Trending Stories</h3>
            <p>Most popular stories today.</p>
            <button>View</button>
          </div>
        </div>
      </div>
    </div>
  );
}
