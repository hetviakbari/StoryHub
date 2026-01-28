import logo from "./Photos/logo.png";
import { Outlet, useNavigate } from "react-router-dom";
import "./Style/Dashboard.css";

export default function Layout() {
  const navigate = useNavigate();

  return (
    <div className="dashboard-container">
      <aside className="sidebar">
        <div className="logo-box">
          <img src={logo} className="sidebar-logo" alt="Logo" />
        </div>

        <ul>
          <li onClick={() => navigate("/dashboard")}>Dashboard</li>
          <li onClick={() => navigate("/explore")}>Explore More</li>
          <li onClick={() => navigate("/saved")}>Saved</li>
          <li onClick={() => navigate("/settings")}>Settings</li>
        </ul>
      </aside>

      <Outlet />
    </div>
  );
}
