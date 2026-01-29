import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../style/settings.css";

export default function Settings() {
  const navigate = useNavigate();

  const token = localStorage.getItem("token");
  const email = localStorage.getItem("userEmail");

  const [userName, setUserName] = useState("");
  const [darkMode, setDarkMode] = useState(
    localStorage.getItem("darkMode") === "true"
  );

  const [showModal, setShowModal] = useState(false);
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  useEffect(() => {
  document.body.className = darkMode ? "dark" : "";
  localStorage.setItem("darkMode", darkMode);
}, [darkMode]);


  useEffect(() => {
    if (darkMode) {
      document.body.classList.add("dark");
      localStorage.setItem("darkMode", "true");
    } else {
      document.body.classList.remove("dark");
      localStorage.setItem("darkMode", "false");
    }
  }, [darkMode]);

  useEffect(() => {
    if (!token || !email) {
      navigate("/login");
      return;
    }

    fetchUser();
  }, []);

  const fetchUser = async () => {
    try {
      const res = await fetch(
        `http://localhost:5000/api/auth/${email}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await res.json();

      if (!res.ok) {
        alert("Session expired. Please login again.");
        handleLogout();
        return;
      }

      setUserName(data.name);
    } catch (err) {
      alert("Unable to fetch user details");
    }
  };

  /* -------------------- LOGOUT -------------------- */
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userName");
    localStorage.removeItem("userEmail");
    navigate("/login");
  };

  /* -------------------- PASSWORD VALIDATION -------------------- */
  const isStrongPassword = (password) => {
    const regex =
      /^(?=.*[0-9])(?=.*[!@#$%^&*])[A-Za-z0-9!@#$%^&*]{8,}$/;
    return regex.test(password);
  };

  /* -------------------- CHANGE PASSWORD -------------------- */
  const handleChangePassword = async () => {
    if (!oldPassword || !newPassword) {
      alert("All fields are required");
      return;
    }

    if (!isStrongPassword(newPassword)) {
      alert(
        "Password must be at least 8 characters and include a number & special character"
      );
      return;
    }

    try {
      const res = await fetch(
        "http://localhost:5000/api/auth/change-password",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ oldPassword, newPassword }),
        }
      );

      const data = await res.json();

      if (!res.ok) {
        alert(data.msg || "Invalid old password");
        return;
      }

      alert("Password changed successfully. Please login again.");
      handleLogout();
    } catch (err) {
      alert("Something went wrong");
    }
  };

  /* -------------------- UI -------------------- */
  return (
    <div className="settings-container">
      <h2>Settings</h2>

      <div className="card">
        <h3>Account</h3>
        <p><b>Username:</b> {userName}</p>
        <p><b>Email:</b> {email}</p>

        <button onClick={() => setShowModal(true)}>
          Change Password
        </button>
      </div>

      <div className="card">
        <h3>Appearance</h3>
        <label className="switch">
          <input
            type="checkbox"
            checked={darkMode}
            onChange={() => setDarkMode(!darkMode)}
          />
          <span>Dark Mode</span>
        </label>
      </div>

      <div className="card">
        <h3>About StoryHub</h3>
        <p>
          <b>StoryHub</b> is a platform where users can read, write,
          and explore stories across multiple genres.
        </p>

        <ul className="about-list">
          <li>📖 Read stories anytime</li>
          <li>✍ Write and publish stories</li>
          <li>💾 Save favorite stories</li>
          <li>🌙 Dark mode reading</li>
        </ul>

        <p className="version-text">Version: 1.0.0</p>
        <p className="muted-text">
          Developed as a learning project.
        </p>
      </div>

      <div className="card danger">
        <button className="logout-btn" onClick={handleLogout}>
          Logout
        </button>
      </div>

      {showModal && (
        <div className="modal-overlay">
          <div className="modal">
            <h3>Change Password</h3>

            <input
              type="password"
              placeholder="Old Password"
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
            />

            <input
              type="password"
              placeholder="New Password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />

            <div className="modal-actions">
              <button onClick={handleChangePassword}>Update</button>
              <button
                className="cancel-btn"
                onClick={() => setShowModal(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
