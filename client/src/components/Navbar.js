import React from "react";
import { Nav, Navbar, NavDropdown } from "react-bootstrap";
import Logout from "./Logout";

// The error occurred because `react-bootstrap-icons` could not be resolved.
// To make the component self-contained and eliminate this dependency,
// we will replace the imported icon with a simple inline SVG.

const DoLogout = () => {
  const handleLogout = () => {
    // Placeholder for logout logic
    console.log("Logout function triggered.");
    // Changed from alert() to a more user-friendly div message
    // since alert() is blocked in the Canvas environment.
    const messageDiv = document.createElement("div");
    messageDiv.innerText = "Logged out successfully!";
    messageDiv.style.cssText = `
      position: fixed;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      background-color: #4CAF50;
      color: white;
      padding: 15px;
      border-radius: 5px;
      z-index: 1000;
      text-align: center;
    `;
    document.body.appendChild(messageDiv);
    setTimeout(() => {
      document.body.removeChild(messageDiv);
    }, 3000);
  };

  return (
    <div onClick={handleLogout} className="cursor-pointer">
      Logout
    </div>
  );
};

// SVG for a hamburger icon - no longer needed with the correct Navbar setup.

const MyNavbar = ({ ref }) => {
  return (
    <Navbar className="bg-red-200 my-navbar" ref={ref} expand="lg">
      <Navbar.Brand href="/">Hypertrophy Tracker</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" className="ms-auto" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="ms-auto">
          <Nav.Link href="/add-exercise">Add Exercise / Measurement</Nav.Link>
          <Nav.Link href="/login">Login</Nav.Link>
          <Nav.Link href="/register">Register</Nav.Link>

          <Nav.Item>
            <Logout />
          </Nav.Item>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default MyNavbar;
