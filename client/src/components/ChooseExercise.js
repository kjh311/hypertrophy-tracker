import React, {
  useState,
  useEffect,
  forwardRef,
  useImperativeHandle,
} from "react";
import { Form, Dropdown } from "react-bootstrap";
import axios from "axios";

// 1. Wrap the component with forwardRef to accept a ref from the parent
const ChooseExercise = forwardRef((props, ref) => {
  const [exerciseTemplates, setExerciseTemplates] = useState([]);
  const [selectedTemplateId, setSelectedTemplateId] = useState(null);
  const [selectedTemplateName, setSelectedTemplateName] =
    useState("Select Exercise");

  const baseUrl =
    process.env.NODE_ENV === "development"
      ? `http://localhost:8080/api`
      : `https://mern-expense-tracker-v5y1.onrender.com/api`;

  // 2. Define fetchTemplates as a standalone function
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

  // 3. Call fetchTemplates on initial mount
  useEffect(() => {
    fetchTemplates();
  }, [baseUrl]);

  // 4. Use useImperativeHandle to expose fetchTemplates via the ref
  useImperativeHandle(ref, () => ({
    fetchTemplates: fetchTemplates,
  }));

  return (
    <span className="">
      <Form.Group className="mb-3">
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
    </span>
  );
});

export default ChooseExercise;
