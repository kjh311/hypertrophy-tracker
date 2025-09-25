import React, { useState } from "react";
import { Button, Modal, Form } from "react-bootstrap";
import axios from "axios";

const AddExcercise = ({ show, handleClose, onTemplateAdded }) => {
  const [exerciseTemplateName, setExerciseTemplateName] = useState("");

  const url =
    process.env.NODE_ENV === "development"
      ? `http://localhost:8080/api/templates`
      : `https://mern-expense-tracker-v5y1.onrender.com/api/templates`;

  const handleAddTemplate = async () => {
    try {
      await axios.post(
        url,
        {
          name: exerciseTemplateName,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem(
              "hypertrophy-token"
            )}`,
            "Content-Type": "application/json",
          },
        }
      );
      // Call a function from the parent to notify that a new template was added
      if (onTemplateAdded) {
        onTemplateAdded();
      }
      // Close the modal and reset the form
      console.log("Exercise Added!");
      handleClose();
      setExerciseTemplateName("");
    } catch (error) {
      console.error("Error adding template:", error);
    }
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Add New Exercise / Measurement</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3">
            <Form.Label>Exercise Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter exercise name"
              value={exerciseTemplateName}
              onChange={(e) => setExerciseTemplateName(e.target.value)}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button variant="primary" onClick={handleAddTemplate}>
          Add
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default AddExcercise;
