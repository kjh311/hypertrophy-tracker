import React from "react";
import { Nav, Navbar } from "react-bootstrap";
import Logout from "./Logout";

const MyNavbar = ({ ref }) => {
  return (
    <Navbar className="bg-red-200 my-navbar" ref={ref}>
      <ul className="flex flex-wrap items-center justify-center text-gray-900 dark:text-white">
        <li className="me-4 hover:underline md:me-6">
          <a href="/login">Login</a>
        </li>
        <li className="me-4 hover:underline md:me-6">
          <a href="/register">Register</a>
        </li>
        <li className="me-4 hover:underline md:me-6">
          <Logout />
        </li>
      </ul>
    </Navbar>
  );
};

export default MyNavbar;
