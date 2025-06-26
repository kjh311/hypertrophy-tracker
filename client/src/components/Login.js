import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { LoggedInContext } from "../App";
import { FaEye, FaEyeSlash } from "react-icons/fa";
// import "./LoginForm.css"; // You'll create this CSS file

const LoginForm = ({ onLoginSuccess, onLoginError, contentHeight }) => {
  // State to hold the email and password input values
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(""); // State to hold any error messages
  const [loading, setLoading] = useState(false); // State to show loading status
  const [loggedIn, setLoggedIn] = useContext(LoggedInContext);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const togglePassword = () => {
    setShowPassword((prev) => !prev);
  };

  // Handler for when the email input changes
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  // Handler for when the password input changes
  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  // Handler for form submission
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default browser form submission

    setError(""); // Clear previous errors
    setLoading(true); // Set loading state

    // Basic validation (you'd add more robust validation later)
    if (!email || !password) {
      setError("Please enter both email and password.");
      setLoading(false);
      return;
    }

    try {
      // --- Replace this with your actual API call to your backend ---
      const API_BASE_URL =
        process.env.NODE_ENV === "production"
          ? "https://mern-expense-tracker-v5y1.onrender.com"
          : "http://localhost:8080";

      const response = await fetch(`${API_BASE_URL}/api/auth/login`, {
        // Assuming /api/auth/login is your login endpoint
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        // Check if the response status is 2xx (success)
        // Login successful
        console.log("Login successful:", data);
        // Assuming your backend sends a token (e.g., JWT)
        localStorage.setItem("hypertrophy-token", data.token);
        localStorage.setItem("hypertrophy-username", data.user.name);
        navigate("/dashboard");
        // You might also store user info if your backend returns it
        // localStorage.setItem('user', JSON.stringify(data.user));

        // Call the success callback passed from the parent component
        if (onLoginSuccess) {
          onLoginSuccess(data);
        }
      } else {
        // Login failed (e.g., invalid credentials, server error)
        console.error("Login failed:", data.message || "Unknown error");
        setError(
          data.message || "Login failed. Please check your credentials."
        );
        // Call the error callback passed from the parent component
        if (onLoginError) {
          onLoginError(data.message || "Login failed.");
        }
      }
    } catch (err) {
      console.error("Network or server error:", err);
      setError("A network error occurred. Please try again.");
      // Call the error callback for network errors
      if (onLoginError) {
        onLoginError("Network error.");
      }
    } finally {
      setLoading(false); // Always stop loading, whether success or failure
    }
  };

  return (
    <div className="login-form-container" style={{ minHeight: contentHeight }}>
      <h2>Login</h2>
      <form onSubmit={handleSubmit} className="login-form">
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={handleEmailChange}
            required
            disabled={loading} // Disable inputs while loading
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            type={`${showPassword ? "text" : "password"}`}
            id="password"
            value={password}
            onChange={handlePasswordChange}
            required
            disabled={loading} // Disable inputs while loading
          />
        </div>
        <div onClick={togglePassword} className={`eye-icons  `}>
          {!showPassword ? <FaEyeSlash /> : <FaEye />}
        </div>
        {error && <p className="error-message">{error}</p>}
        <button type="submit" disabled={loading}>
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>
    </div>
  );
};

export default LoginForm;
