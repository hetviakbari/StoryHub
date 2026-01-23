import { useState } from "react";
import API from "../services/api";
import "../Style/Auth.css";
import logo from "../Photos/logo.png";
import { Link } from "react-router-dom";


export default function Register() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: ""
  });

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    await API.post("/auth/register", form);
    alert("Registered Successfully");
  };

  return (
    
    <div className="auth-wrapper">
      <div className="auth-card">
        <img src={logo} className="auth-logo" />

        <h2>Create your StoryHub account</h2>
        <p>Join writers and readers worldwide</p>

        <form onSubmit={handleSubmit}>
          <input name="name" placeholder="Full Name" onChange={handleChange} />
          <input name="email" placeholder="Email" onChange={handleChange} />
          <input name="password" type="password" placeholder="Password" onChange={handleChange} />

          <button>Create Account</button>
        </form>

        <p className="auth-footer">
          Already have an account? <Link to ="/login"><span>Sign In</span></Link>
        </p>
      </div>
    </div>
  );
}
