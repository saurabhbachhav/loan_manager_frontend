import React from "react";
import AdminDashboard from "./AdminDashboard";
import VerifierDashboard from "./VerifierDashboard";
import UserDashboard from "./UserDashboard";
import "./Dashboard.css";
import { useNavigate } from "react-router-dom";

function Dashboard() {
  // Assume role is saved during login (e.g., "admin", "verifier", or "user")
  const role = localStorage.getItem("role") || "user";
  const navigate = useNavigate();

  const handleNavigation = (path) => {
    navigate(path);
  };

  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };

  return (
    <div className="dashboard-wrapper">
      <aside className="sidebar">
      <h3>{role} Dashboard</h3>
      <ul>
        <li onClick={() => handleNavigation(`/${role.toLowerCase()}/dashboard`)}>Home</li>
        <li onClick={() => handleNavigation(`/${role.toLowerCase()}/profile`)}>Profile</li>
        <li onClick={() => handleNavigation(`/${role.toLowerCase()}/settings`)}>Settings</li>
        <li onClick={handleLogout}>Logout</li>
      </ul>
    </aside>
      <main className="dashboard-content">
        {role === "admin" ? (
          <AdminDashboard />
        ) : role === "verifier" ? (
          <VerifierDashboard />
        ) : (
          <UserDashboard />
        )}
      </main>
    </div>
  );
}

export default Dashboard;
