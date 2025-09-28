import React, { useState, useEffect, useCallback } from "react";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import { Button, Modal, Form, Dropdown } from "react-bootstrap";
import axios from "axios";

// --- Data Definitions ---

// Categories for adding a new template
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

// Base URL for API calls
const API_BASE_URL =
  process.env.NODE_ENV === "development"
    ? `http://localhost:8080/api`
    : `https://mern-expense-tracker-v5y1.onrender.com/api`;

// --- Inline Components ---

/**
 * AddExcercise Modal component (formerly AddExcercise.jsx)
 * Handles creating a new exercise or measurement template.
 */
const AddExcercise = ({ show, handleClose, onTemplateAdded }) => {
  const [exerciseTemplateName, setExerciseTemplateName] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(CATEGORIES[0]);

  const handleAddTemplate = async () => {
    if (!exerciseTemplateName.trim()) {
      console.error("Exercise name cannot be empty.");
      return;
    }

    try {
      // NOTE: This uses the /templates endpoint
      await axios.post(
        `${API_BASE_URL}/templates`,
        {
          name: exerciseTemplateName,
          category: selectedCategory,
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

      // Call the callback function to notify the parent (TabNav) and refresh the dropdown
      if (onTemplateAdded) {
        onTemplateAdded();
      }

      console.log(
        `Template Added: ${exerciseTemplateName} in category ${selectedCategory}`
      );
      handleClose();
      setExerciseTemplateName("");
      setSelectedCategory(CATEGORIES[0]); // Reset category selection
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
              placeholder="Enter exercise name (e.g., Barbell Bench Press)"
              value={exerciseTemplateName}
              onChange={(e) => setExerciseTemplateName(e.target.value)}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Category</Form.Label>
            <Form.Control
              as="select"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
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
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button
          variant="primary"
          onClick={handleAddTemplate}
          disabled={!exerciseTemplateName.trim()}
        >
          Add
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

/**
 * ChooseExercise Dropdown component (formerly ChooseExercise.jsx)
 * Fetches and displays the list of templates.
 * This component is self-contained and manages its own state for templates.
 */
const ChooseExercise = ({ onTemplatesFetched }) => {
  const [exerciseTemplates, setExerciseTemplates] = useState([]);
  const [selectedTemplateId, setSelectedTemplateId] = useState(null);
  const [selectedTemplateName, setSelectedTemplateName] =
    useState("Select Exercise");

  // Function to fetch templates, exposed for manual refresh
  const fetchTemplates = useCallback(async () => {
    try {
      const token = localStorage.getItem("hypertrophy-token");
      const res = await axios.get(`${API_BASE_URL}/templates`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setExerciseTemplates(res.data);
      // Optional: Notify parent component that templates were fetched
      if (onTemplatesFetched) {
        onTemplatesFetched(res.data);
      }
    } catch (error) {
      console.error("Error fetching templates:", error);
    }
  }, [onTemplatesFetched]); // Depend on onTemplatesFetched if it's used

  useEffect(() => {
    fetchTemplates();
  }, [fetchTemplates]); // Initial load and whenever fetchTemplates changes

  return (
    <span className="inline-block">
      <Form.Group className="mb-0">
        <Dropdown
          onSelect={(eventKey) => {
            const selected = exerciseTemplates.find(
              (template) => template._id === eventKey
            );
            if (selected) {
              setSelectedTemplateId(selected._id);
              setSelectedTemplateName(selected.name);
            }
          }}
        >
          <Dropdown.Toggle
            variant="secondary"
            id="dropdown-basic"
            className="truncate max-w-[200px]"
          >
            {selectedTemplateName}
          </Dropdown.Toggle>
          <Dropdown.Menu className="max-h-60 overflow-y-auto">
            {exerciseTemplates.length > 0 ? (
              exerciseTemplates.map((template) => (
                <Dropdown.Item key={template._id} eventKey={template._id}>
                  {template.name}
                </Dropdown.Item>
              ))
            ) : (
              <Dropdown.Item disabled>No templates available</Dropdown.Item>
            )}
          </Dropdown.Menu>
        </Dropdown>
      </Form.Group>
    </span>
  );
};

// --- Main Component ---

const TabNav = () => {
  const [workoutName, setWorkoutName] = useState("");
  const [showAddExerciseModal, setShowAddExerciseModal] = useState(false);

  // State to force re-render/re-fetch of templates in ChooseExercise
  const [templateRefreshKey, setTemplateRefreshKey] = useState(0);

  const handleClose = () => setShowAddExerciseModal(false);
  const handleShow = () => setShowAddExerciseModal(true);

  // Callback to trigger re-fetch in ChooseExercise after AddExcercise is successful
  const handleTemplateAdded = useCallback(() => {
    // Increment the key to force ChooseExercise to re-render and re-run its useEffect (fetchTemplates)
    setTemplateRefreshKey((prevKey) => prevKey + 1);
    handleClose();
  }, []);

  // To avoid complex forwardRef, we use a key prop to force re-render/re-fetch
  // in the ChooseExercise component. Since ChooseExercise is now using the
  // templateRefreshKey in its dependency array, changing this key will trigger
  // a re-fetch of the templates, thus updating the dropdown.

  return (
    <div className="p-4 bg-gray-50 min-h-screen">
      {/* <h1 className="text-3xl font-bold text-center mb-6 text-indigo-700">
        Workout Tracker
      </h1> */}

      <div className="mb-6 flex justify-center">
        <ul className="flex items-center space-x-4">
          <li className="flex items-center">
            <button
              onClick={handleShow}
              className="px-4 py-2 text-white bg-indigo-600 rounded-lg shadow-md hover:bg-indigo-700 transition duration-150 ease-in-out font-semibold text-sm"
            >
              + Add Template
            </button>
            <AddExcercise
              show={showAddExerciseModal}
              handleClose={handleClose}
              onTemplateAdded={handleTemplateAdded}
            />
          </li>
          <li className="flex items-center">
            {/* Pass the key prop to force re-render/re-fetch */}
            <ChooseExercise key={templateRefreshKey} />
          </li>
        </ul>
      </div>

      {/* Tabs */}
      <div className="max-w-4xl mx-auto">
        <Tabs
          defaultActiveKey="tracker"
          id="uncontrolled-tab-example"
          className="mb-3 flex justify-center border-b border-gray-200"
        >
          <Tab
            eventKey="tracker"
            title={
              <span className="flex items-center py-2 px-4 font-medium text-gray-700 hover:text-indigo-600">
                Tracker <span className="ml-2 text-xl">💪</span>
              </span>
            }
            tabClassName="focus:outline-none"
          >
            <div className="p-4 bg-white rounded-b-lg shadow-lg">
              <h2 className="text-xl font-semibold mb-4 text-gray-800">
                Log New Workout
              </h2>
              <p>Tab content for Tracker</p>
              {/* <PostNewWorkout
                workoutName={workoutName}
                setWorkoutName={setWorkoutName}
              />
              <ShowWorkouts
                workoutName={workoutName}
                setWorkoutName={setWorkoutName}
              /> */}
            </div>
          </Tab>

          <Tab
            eventKey="progress"
            title={
              <span className="flex items-center py-2 px-4 font-medium text-gray-700 hover:text-indigo-600">
                Progress <span className="ml-2 text-xl">📊</span>
              </span>
            }
            tabClassName="focus:outline-none"
          >
            <div className="p-4 bg-white rounded-b-lg shadow-lg">
              <h2 className="text-xl font-semibold mb-4 text-gray-800">
                Performance Over Time
              </h2>
              <p>Tab content for Progress</p>
            </div>
          </Tab>
        </Tabs>
      </div>
    </div>
  );
};

export default TabNav;
