import React, { useState, useEffect, useCallback, useMemo } from "react";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import { Button, Modal, Form, Dropdown } from "react-bootstrap";
import axios from "axios";

// Base URL for API calls
const API_BASE_URL =
  process.env.NODE_ENV === "development"
    ? `http://localhost:8080/api`
    : `https://mern-expense-tracker-v5y1.onrender.com/api`;

// --- Inline AddExcercise Component ---

const CATEGORIES = [
  "Biceps",
  "Triceps",
  "Shoulders",
  "Chest",
  "Back",
  "Forearms",
  "Calves",
  "Hamstrings",
  "Quads",
  "Abs",
  "Measurements",
];

const AddExcercise = ({ show, handleClose, onTemplateAdded }) => {
  const [exerciseTemplateName, setExerciseTemplateName] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(CATEGORIES[0]);

  const handleAddTemplate = async () => {
    if (!exerciseTemplateName.trim()) {
      console.error("Exercise name cannot be empty.");
      return;
    }

    try {
      await axios.post(
        `${API_BASE_URL}/templates`,
        {
          name: exerciseTemplateName,
          category: selectedCategory, // Include the selected category
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

      console.log(
        `Template Added: ${exerciseTemplateName} in category ${selectedCategory}`
      );

      // Call the parent callback to trigger the ChooseExercise refresh
      if (onTemplateAdded) {
        onTemplateAdded();
      }

      // Close the modal and reset the form
      handleClose();
      setExerciseTemplateName("");
      setSelectedCategory(CATEGORIES[0]); // Reset category selection
    } catch (error) {
      console.error("Error adding template:", error);
    }
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton className="bg-indigo-50 border-b">
        <Modal.Title className="text-xl font-semibold text-indigo-800">
          Add New Template
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-4">
            <Form.Label className="font-medium text-gray-700">
              Exercise Name
            </Form.Label>
            <Form.Control
              type="text"
              placeholder="e.g., Barbell Bench Press, Waist Circumference"
              value={exerciseTemplateName}
              onChange={(e) => setExerciseTemplateName(e.target.value)}
              className="rounded-lg shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label className="font-medium text-gray-700">
              Category
            </Form.Label>
            <Form.Control
              as="select"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="rounded-lg shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            >
              {CATEGORIES.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </Form.Control>
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer className="bg-gray-50 border-t">
        <Button
          variant="secondary"
          onClick={handleClose}
          className="hover:bg-gray-200 transition duration-150"
        >
          Cancel
        </Button>
        <Button
          variant="primary"
          onClick={handleAddTemplate}
          disabled={!exerciseTemplateName.trim()}
          className="bg-indigo-600 border-indigo-600 hover:bg-indigo-700 transition duration-150"
        >
          Add Template
        </Button>
      </Modal.Footer>
    </Modal>
  );
};
