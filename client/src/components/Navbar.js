import React from "react";
import { Nav, Navbar } from "react-bootstrap";
import Logout from "./Logout";

const MyNavbar = ({ ref }) => {
  return (
    <Navbar className="bg-red-200 my-navbar" ref={ref}>
      <ul>
        <li>
          <a href="/login">Login</a>
        </li>
        <li>
          <a href="/register">Register</a>
        </li>
        <li>
          <Logout />
        </li>
      </ul>
    </Navbar>
  );
};

export default MyNavbar;
