import React, { useState } from "react";
import TabNav from "./TabNav";

const Dashboard = ({ contentHeight }) => {
  const [name, setName] = useState(
    localStorage.getItem("hypertrophy-username")
  );
  return (
    <div
      style={{ minHeight: contentHeight }}
      className="dashboard-wrapper m-auto "
    >
      {/* <h2>Welcome, {name}!</h2> */}
      <br />
      <TabNav />
    </div>
  );
};

export default Dashboard;
