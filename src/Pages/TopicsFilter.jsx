import { useState } from "react";
import "../Style/TopicsFilter.css";
import { useNavigate } from "react-router-dom";

const topicsData = {
    Life: ["Personal Growth", "Mental Health", "Productivity", "Travel", "Creativity"],
    Technology: ["AI", "Web Development", "Software Engineering", "Cybersecurity", "Data Science"],
    Relationships: ["Dating", "Marriage", "Friendship", "Family"],
    Education: ["Learning", "Higher Education", "Study Tips", "Online Learning"],
    Professional: ["Business", "Entrepreneurship", "Marketing", "Leadership"],
};

export default function TopicsFilter() {
    const [selectedTopics, setSelectedTopics] = useState([]);
    const navigate = useNavigate();

    const toggleTopic = (topic) => {
        if (selectedTopics.includes(topic)) {
            setSelectedTopics(selectedTopics.filter((t) => t !== topic));
        } else {
            setSelectedTopics([...selectedTopics, topic]);
        }
    };

    const handleContinue = async () => {
        const email = localStorage.getItem("userEmail");

        const res = await fetch("http://localhost:5000/api/preferences/save", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                email,
                topics: selectedTopics,
            }),
        });

        const data = await res.json();
        navigate("/dashboard");
        console.log("Response from server:", data);
        console.log("Saved:", data);
    };

    return (
        <div className="topics-page">

            {/* Header */}
            <header className="topics-header">
                <h1>StoryHub</h1>
                <p className="project-line">
                    Personalize your StoryHub feed by selecting topics you love.
                </p>

            </header>

            {/* Main Content */}
            <div className="topics-container">

                {/* Title */}
                <div className="title-section">
                    <h2>What are you interested in?</h2>
                    <p>Select topics to personalize your StoryHub feed.</p>
                </div>

                {/* Topic Sections */}
                {Object.keys(topicsData).map((category) => (
                    <div key={category} className="topic-section">
                        <h3>{category}</h3>

                        <div className="topics-grid">
                            {topicsData[category].map((topic) => (
                                <div
                                    key={topic}
                                    className={`topic-chip ${selectedTopics.includes(topic) ? "selected" : ""
                                        }`}
                                    onClick={() => toggleTopic(topic)}
                                >
                                    {topic}
                                </div>
                            ))}
                        </div>
                    </div>
                ))}

                {/* Footer */}
                <div className="topics-footer">
                    <p>{selectedTopics.length} topics selected</p>
                    <button
                        className={`continue-btn ${selectedTopics.length === 0 ? "disabled" : ""}`}
                        disabled={selectedTopics.length === 0}
                        onClick={handleContinue}
                    >
                        Continue
                    </button>

                </div>
            </div>
        </div>
    );
}
