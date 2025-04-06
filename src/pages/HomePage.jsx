import React from "react";

function HomePage() {
  const role = localStorage.getItem("role") || "User";
  return (
    <div style={{ padding: "20px" }}>
      <h2>{role} Home</h2>
      <p>Welcome to your home dashboard, {role}!</p>
    </div>
  );
}

export default HomePage;
