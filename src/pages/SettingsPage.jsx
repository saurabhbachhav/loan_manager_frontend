import React from "react";

function SettingsPage() {
  const role = localStorage.getItem("role") || "User";
  return (
    <div style={{ padding: "20px" }}>
      <h2>{role} Settings</h2>
      <p>Here you can manage your settings, {role}.</p>
    </div>
  );
}

export default SettingsPage;
