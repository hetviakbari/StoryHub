import React from "react";
import "../Style/LandingPage.css";
import logo from "../Photos/logo.png";
import { Link } from "react-router-dom";
import "./Register.jsx";


const LandingPage = () => {
  return (
    <>
      {/* NAVBAR */}
      <nav className="navbar">
        <div className="nav-container">
          <div className="logo">
            <img src={logo} alt="StoryHub Logo" className="logo-img" />
          </div>
          <div className="nav-actions">
            <Link to="/login" className="btn outline">Sign In</Link>
            <Link to="/register" className="btn primary">Get Started</Link>
          </div>
        </div>
      </nav>

      {/* HERO */}
      <section className="hero">
        <div className="hero-content">
          <h1>Where stories are written, not rushed.</h1>
          <p>
            StoryHub is a calm, focused space for writers and readers who care about
            ideas, clarity, and meaningful conversations.
          </p>

          <div className="hero-buttons">
            <Link to="/register" className="btn primary">Start Writing</Link>
            <Link to="/login" className="btn outline">Read Articles</Link>
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section className="section">
        <h2 className="section-title">What is StoryHub?</h2>
        <p className="section-text">
          StoryHub is a modern publishing platform built for people who enjoy reading
          thoughtful articles and writing without distractions. Whether you are
          sharing knowledge, personal experiences, or opinions, StoryHub helps your
          words reach the right audience.
        </p>
      </section>

      {/* WHO IS IT FOR */}
      <section className="section">
        <h2 className="section-title">Who is StoryHub for?</h2>

        <div className="features">
          <div className="card">
            <h3>Writers</h3>
            <p>
              Write freely using a clean editor and publish articles without noise or
              unnecessary formatting tools.
            </p>
          </div>

          <div className="card">
            <h3>Readers</h3>
            <p>
              Discover articles that are easy to read, thoughtfully written, and free
              from distractions.
            </p>
          </div>

          <div className="card">
            <h3>Students & Learners</h3>
            <p>
              Share learnings, document journeys, and build a strong writing portfolio
              over time.
            </p>
          </div>
        </div>
      </section>

      {/* STATS */}
      <section className="section stats">
        <div className="stats-grid">
          <div>
            <h3>10K+</h3>
            <p>Readers</p>
          </div>
          <div>
            <h3>2K+</h3>
            <p>Published Articles</p>
          </div>
          <div>
            <h3>500+</h3>
            <p>Active Writers</p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="cta">
        <h2>Start writing your first story today.</h2>
        <p>
          Create an account, publish your thoughts, and join a growing community of
          writers.
        </p>
        <Link to="/register" className="btn primary large">Create Free Account</Link>
      </section>


      {/* FOOTER */}
      <footer className="footer">
        <p>© 2026 StoryHub — Built with MERN Stack</p>
      </footer>
    </>
  );
};

export default LandingPage;
