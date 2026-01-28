import { Routes, Route } from "react-router-dom";
import LandingPage from "./Pages/LandingPage.jsx";
import "./App.css";
import Register from "./Pages/Register.jsx";
import Login from "./Pages/login.jsx"
import TopicsFilter from "./Pages/TopicsFilter.jsx";
import Dashboard from "./Pages/Dashboard.jsx";
import StoryRead from "./Pages/StoryRead.jsx";
import Explore from "./Pages/Explore.jsx";
import Saved from "./Pages/saved.jsx";
import Layout from "./Layout.jsx";

function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="*" element={<h1>404 Not Found</h1>} />

      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route path="/filter" element={<TopicsFilter />} />
      <Route element={<Layout />}>
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/story/:id" element={<StoryRead />} /> 
      <Route path="/explore" element={<Explore />} />
      <Route path="/saved" element={<Saved />} />
      </Route>

    </Routes>
  );
}

export default App;
