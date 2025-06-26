import React from "react";

const Welcome = ({ contentHeight }) => {
  return (
    <div style={{ minHeight: contentHeight }}>
      {" "}
      <h1>Hypertrophy Tracker</h1>
      <h1 className="text-3xl font-bold underline">Hello world!</h1>
    </div>
  );
};

export default Welcome;
