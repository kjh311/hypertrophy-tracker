import React from "react";
import { Nav, Navbar } from "react-bootstrap";

const MyNavbar = () => {
  return (
    <Navbar className="bg-red-200 my-navbar">
      <ul>
        <li>
          <a href="/login">Login</a>
        </li>
        <li>
          <a href="/register">Register</a>
        </li>
      </ul>
    </Navbar>
  );
};

export default MyNavbar;
