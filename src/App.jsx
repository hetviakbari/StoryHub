import { Routes, Route } from "react-router-dom";
import LandingPage from "./Pages/LandingPage.jsx";
import "./App.css";
import Register from "./Pages/Register.jsx";
import Login from "./Pages/login.jsx"

function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="*" element={<h1>404 Not Found</h1>} />

      <Route path="/register" element={<Register />} />
      <Route path="/login" element = {<Login /> } />
    </Routes>
  );
}

export default App;
