import { Bell, MessageSquare, User } from "lucide-react";
import "./Navbar.css";
import logo from "../assets/creditsea_logo.jpeg";
import { useEffect, useState } from "react";

function Navbar() {
   const token = localStorage.getItem("token");
  const [role, setRole] = useState("");

  useEffect(() => {
    const rol = localStorage.getItem("role");
    if (rol != null) {
      setRole(rol);
    } else {
      setRole("Login");
    }
  }, [role]);

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="logo-container">
          <img src={logo} alt="Credit Sea Logo" className="logo-img" />
          <h1 className="logo-text">Credit Sea</h1>
        </div>

        <div className="icon-group">
          <div className="icon-wrapper notification">
            <Bell />
            <span className="red-dot" />
          </div>
          <div className="icon-wrapper">
            <MessageSquare />
          </div>
          <div className="icon-wrapper profile-dropdown">
            <User />
            <span className="username">{role}</span>
            <span className="dropdown-arrow">▼</span>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
