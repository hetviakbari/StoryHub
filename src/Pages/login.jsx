import "../Style/Auth.css";
import API from "../services/api";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    email: "",
    password: ""
  });

  const [error, setError] = useState("");
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const submit = async (e) => {
    e.preventDefault();

    try {
      const res = await API.post("/auth/login", form);

      if (res.data.success) {
        setShowSuccessModal(true);

        localStorage.setItem("token", res.data.token);
        localStorage.setItem("userEmail", res.data.user.email);
        localStorage.setItem("emailPrefix", res.data.user.email.split("@")[0]);

        setTimeout(() => {
          setShowSuccessModal(false);

          if (res.data.user.isPreferenceSelected) {
            navigate("/dashboard");
          } else {
            navigate("/filter");
          }

        }, 2000);
      } else {
        setError(res.data.message || "❌ Login failed");
      }

    } catch (err) {
      console.log(err);
      setError("Server error");
    }
  };

  return (
    <div className="auth-wrapper">
      <div className="auth-card">
        <h2>Welcome Back</h2>
        <p>Login to your StoryHub account</p>

        {error && <p style={{ color: "red" }}>{error}</p>}

        <form onSubmit={submit}>
          <input name="email" placeholder="Email" onChange={handleChange} />
          <input name="password" type="password" placeholder="Password" onChange={handleChange} />
          <button type="submit">Login</button>
        </form>

        <p className="auth-footer">
          Don’t have an account? <Link to="/register"><span>Sign Up</span></Link>
        </p>
      </div>

      {/* Success Modal */}
      {showSuccessModal && (
        <div className="success-modal">
          <p>✅ Login Successful! Redirecting...</p>
        </div>
      )}
    </div>
  );
}
