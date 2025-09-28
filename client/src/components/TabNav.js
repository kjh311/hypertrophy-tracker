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

// --- Global Constants (Accessible by all components in this file) ---

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

// --- Inline AddExcercise Component ---

const AddExcercise = ({ show, handleClose, onTemplateAdded }) => {
  const [exerciseTemplateName, setExerciseTemplateName] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(CATEGORIES[0]);

  const handleAddTemplate = async () => {
    if (!exerciseTemplateName.trim()) {
      console.error("Exercise name cannot be empty.");
      return;
    }

    try {
      // The API endpoint handles creating a template with name and category
      await axios.post(
        `${API_BASE_URL}/templates`,
        {
          name: exerciseTemplateName,
          category: selectedCategory, // Send the selected category
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

// --- Inline ChooseExercise Component ---

const ChooseExercise = () => {
  const [exerciseTemplates, setExerciseTemplates] = useState([]);
  const [selectedTemplateId, setSelectedTemplateId] = useState(null);
  const [selectedTemplateName, setSelectedTemplateName] =
    useState("Select Exercise");

  // Function to fetch templates
  const fetchTemplates = useCallback(async () => {
    try {
      const token = localStorage.getItem("hypertrophy-token");
      const res = await axios.get(`${API_BASE_URL}/templates`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      // Assuming the API now returns the category field on the template object
      setExerciseTemplates(res.data);
    } catch (error) {
      console.error("Error fetching templates:", error);
    }
  }, []);

  // useEffect runs on component mount and every time the component is re-mounted
  // (which is forced by the key change in TabNav)
  useEffect(() => {
    fetchTemplates();
  }, [fetchTemplates]);

  // Use useMemo to group templates by category and maintain order
  const groupedTemplates = useMemo(() => {
    const orderedCategories = [...CATEGORIES];
    const groups = {};

    // Grouping logic
    exerciseTemplates.forEach((template) => {
      // Fallback to "Other" if category is missing from the data
      const category = template.category || "Other";
      if (!groups[category]) {
        groups[category] = [];
      }
      groups[category].push(template);
    });

    const orderedGroups = {};

    // 1. Create ordered list based on CATEGORIES array
    orderedCategories.forEach((category) => {
      if (groups[category] && groups[category].length > 0) {
        orderedGroups[category] = groups[category];
      }
    });

    // 2. Add any 'Other' or uncategorized groups that aren't in the predefined list
    Object.keys(groups).forEach((category) => {
      if (!orderedCategories.includes(category)) {
        orderedGroups[category] = groups[category];
      }
    });

    return orderedGroups;
  }, [exerciseTemplates]);

  return (
    <span className="inline-block w-full sm:w-auto">
      <Form.Group className="mb-0">
        <Dropdown
          onSelect={(eventKey) => {
            // Find the selected template across all categories
            let selected = null;
            for (const category in groupedTemplates) {
              selected = groupedTemplates[category].find(
                (template) => template._id === eventKey
              );
              if (selected) break;
            }

            if (selected) {
              setSelectedTemplateId(selected._id);
              setSelectedTemplateName(selected.name);
            }
          }}
        >
          <Dropdown.Toggle
            variant="secondary"
            id="dropdown-basic"
            className="w-full text-left sm:w-auto truncate max-w-full sm:max-w-[200px] border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 rounded-lg"
          >
            {selectedTemplateName}
          </Dropdown.Toggle>
          <Dropdown.Menu className="max-h-60 overflow-y-auto shadow-xl rounded-lg border border-gray-200">
            {Object.keys(groupedTemplates).length > 0 ? (
              Object.keys(groupedTemplates).map((category, index, array) => (
                <React.Fragment key={category}>
                  <Dropdown.Header className="font-bold text-xs uppercase text-indigo-600 bg-indigo-50 py-1 px-3 sticky top-0 z-10 border-b border-indigo-200">
                    {category}
                  </Dropdown.Header>
                  {groupedTemplates[category].map((template) => (
                    <Dropdown.Item
                      key={template._id}
                      eventKey={template._id}
                      className="hover:bg-indigo-100 text-gray-800 truncate"
                    >
                      {template.name}
                    </Dropdown.Item>
                  ))}
                  {/* Only add divider if it's not the last category to separate groups visually */}
                  {index < array.length - 1 && (
                    <Dropdown.Divider className="my-1 border-indigo-100" />
                  )}
                </React.Fragment>
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

// --- Main TabNav Component ---

const TabNav = () => {
  const [workoutName, setWorkoutName] = useState("");
  const [showAddExerciseModal, setShowAddExerciseModal] = useState(false);

  // State to force re-render/re-fetch of templates in ChooseExercise
  const [templateRefreshKey, setTemplateRefreshKey] = useState(0);

  const handleClose = () => setShowAddExerciseModal(false);
  const handleShow = () => setShowAddExerciseModal(true);

  // Callback to trigger re-fetch in ChooseExercise after AddExcercise is successful
  const handleTemplateAdded = useCallback(() => {
    // Increment the key to force ChooseExercise to re-mount and re-fetch.
    setTemplateRefreshKey((prevKey) => prevKey + 1);
    handleClose();
  }, []);

  return (
    <div className="p-2 sm:p-4 bg-gray-50 min-h-screen font-sans">
      <h1 className="text-2xl sm:text-3xl font-extrabold text-center mb-4 sm:mb-6 text-indigo-800">
        Hypertrophy Tracker
      </h1>

      {/* Responsive layout for the controls (Add Template and Dropdown) */}
      <div className="mb-6 flex justify-center">
        <ul className="flex flex-col sm:flex-row items-center space-y-3 sm:space-y-0 sm:space-x-4 w-full max-w-lg">
          <li className="flex items-center w-full sm:w-auto">
            <button
              onClick={handleShow}
              className="w-full px-4 py-2 text-white bg-indigo-600 rounded-lg shadow-lg hover:bg-indigo-700 transition duration-150 ease-in-out font-bold text-base sm:w-auto"
            >
              + Add Template
            </button>
            <AddExcercise
              show={showAddExerciseModal}
              handleClose={handleClose}
              onTemplateAdded={handleTemplateAdded}
            />
          </li>
          <li className="flex items-center w-full sm:w-auto">
            {/* Using the key prop to force re-mount and re-fetch in ChooseExercise */}
            <ChooseExercise key={templateRefreshKey} />
          </li>
        </ul>
      </div>

      {/* Tabs */}
      <div className="max-w-4xl mx-auto">
        <Tabs
          defaultActiveKey="tracker"
          id="workout-tabs"
          className="mb-3 flex justify-center border-b-2 border-indigo-200"
        >
          <Tab
            eventKey="tracker"
            title={
              <span className="flex items-center py-2 px-3 sm:px-4 font-extrabold text-gray-700 hover:text-indigo-600 text-base sm:text-lg">
                Tracker <span className="ml-2 text-xl">🏋️</span>
              </span>
            }
            tabClassName="focus:outline-none"
          >
            <div className="p-3 sm:p-4 bg-white rounded-b-lg shadow-2xl">
              <h2 className="text-xl sm:text-2xl font-bold mb-4 text-indigo-700">
                Log New Workout
              </h2>
              <p className="text-gray-600">
                This is where the workout logging form will go.
              </p>
            </div>
          </Tab>

          <Tab
            eventKey="progress"
            title={
              <span className="flex items-center py-2 px-3 sm:px-4 font-extrabold text-gray-700 hover:text-indigo-600 text-base sm:text-lg">
                Progress <span className="ml-2 text-xl">📈</span>
              </span>
            }
            tabClassName="focus:outline-none"
          >
            <div className="p-3 sm:p-4 bg-white rounded-b-lg shadow-2xl">
              <h2 className="text-xl sm:text-2xl font-bold mb-4 text-indigo-700">
                Performance Overview
              </h2>
              <p className="text-gray-600">
                This tab will display charts and progress metrics.
              </p>
            </div>
          </Tab>
        </Tabs>
      </div>
    </div>
  );
};

export default TabNav;
