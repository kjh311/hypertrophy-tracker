import React, { useState, useEffect } from "react";
import { Form, Dropdown } from "react-bootstrap";
import axios from "axios";

const ChooseExercise = () => {
  const [exerciseTemplates, setExerciseTemplates] = useState([]);
  const [selectedTemplateId, setSelectedTemplateId] = useState(null);
  const [selectedTemplateName, setSelectedTemplateName] =
    useState("Select Exercise");

  const baseUrl =
    process.env.NODE_ENV === "development"
      ? `http://localhost:8080/api`
      : `https://mern-expense-tracker-v5y1.onrender.com/api`;

  useEffect(() => {
    const fetchTemplates = async () => {
      try {
        const token = localStorage.getItem("hypertrophy-token");
        const res = await axios.get(`${baseUrl}/templates`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setExerciseTemplates(res.data);
      } catch (error) {
        console.error("Error fetching templates:", error);
      }
    };
    fetchTemplates();
  }, [baseUrl]);

  return (
    <div className="">
      <Form.Group className="mb-3">
        {/* <Form.Label>Choose Exercise</Form.Label> */}
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
          <Dropdown.Toggle variant="secondary" id="dropdown-basic">
            {selectedTemplateName}
          </Dropdown.Toggle>
          <Dropdown.Menu>
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
    </div>
  );
};

export default ChooseExercise;
