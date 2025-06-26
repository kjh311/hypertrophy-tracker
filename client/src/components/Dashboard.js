import React, { useState } from "react";

const Dashboard = ({ contentHeight }) => {
  const [name, setName] = useState(
    localStorage.getItem("hypertrophy-username")
  );
  return (
    <div style={{ minHeight: contentHeight }}>
      <h1>Dashboard</h1>
      <br />
      <h2>Welcome, {name}!</h2>
    </div>
  );
};

export default Dashboard;
