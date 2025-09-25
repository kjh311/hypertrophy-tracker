import React, { useState } from "react";
import { Nav, Navbar } from "react-bootstrap";
import AddExcercise from "./AddExcercise";
import Logout from "./Logout";

const MyNavbar = () => {
  const [showAddExerciseModal, setShowAddExerciseModal] = useState(false);

  const handleClose = () => setShowAddExerciseModal(false);
  const handleShow = () => setShowAddExerciseModal(true);

  // Placeholder for templates data. You will need to fetch this from your
  // API and pass it to this component from a parent component.
  const templates = [
    { _id: "1", name: "Bench Press" },
    { _id: "2", name: "Deadlift" },
    { _id: "3", name: "Squat" },
    { _id: "4", name: "Body Weight" },
  ];

  return (
    <>
      <Navbar className="bg-red-200 my-navbar" expand="lg">
        <Navbar.Brand href="/">Hypertrophy Tracker</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" className="ms-auto" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link onClick={handleShow}>Add Exercise / Measurement</Nav.Link>
            <Nav.Link href="/login">Login</Nav.Link>
            <Nav.Link href="/register">Register</Nav.Link>
            <Nav.Link>
              <Logout />
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>

      <AddExcercise
        show={showAddExerciseModal}
        handleClose={handleClose}
        templates={templates}
      />
    </>
  );
};

export default MyNavbar;
