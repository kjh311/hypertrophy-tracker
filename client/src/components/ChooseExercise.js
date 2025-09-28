import React, { useState, useEffect, useCallback, useMemo } from "react";
import { Form, Dropdown } from "react-bootstrap";
import axios from "axios";

// Base URL for API calls
const API_BASE_URL =
  process.env.NODE_ENV === "development"
    ? `http://localhost:8080/api`
    : `https://mern-expense-tracker-v5y1.onrender.com/api`;

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

export default ChooseExercise;
