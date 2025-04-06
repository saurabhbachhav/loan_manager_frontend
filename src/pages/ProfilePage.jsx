import React from "react";

function ProfilePage() {
  const role = localStorage.getItem("role") || "User";
  return (
    <div style={{ padding: "20px" }}>
      <h2>{role} Profile</h2>
      <p>This is your profile page, {role}.</p>
    </div>
  );
}

export default ProfilePage;
