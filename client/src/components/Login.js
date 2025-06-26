import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { LoggedInContext } from "../App";
import { FaEye, FaEyeSlash } from "react-icons/fa";
// No custom CSS file needed with Tailwind, so this import is removed.

const LoginForm = ({ contentHeight, onLoginSuccess, onLoginError }) => {
  // State to hold the email and password input values
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(""); // State to hold any error messages
  const [loading, setLoading] = useState(false); // State to show loading status
  const [, setLoggedIn] = useContext(LoggedInContext); // Destructure loggedIn but not using it directly here
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
          ? "https://mern-expense-tracker-v5y1.onrender.com" // Your deployed backend URL
          : "http://localhost:8080"; // Your local backend URL

      const response = await fetch(`${API_BASE_URL}/api/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        // Login successful (status 2xx)
        console.log("Login successful:", data);
        localStorage.setItem("hypertrophy-token", data.token);
        localStorage.setItem("hypertrophy-username", data.user.name); // Assuming user.name exists

        setLoggedIn(true); // Update global login state
        navigate("/dashboard"); // Redirect to dashboard

        if (onLoginSuccess) {
          onLoginSuccess(data); // Call parent success callback
        }
      } else {
        // Login failed (e.g., invalid credentials, server error)
        console.error("Login failed:", data.message || "Unknown error");
        setError(
          data.message || "Login failed. Please check your credentials."
        );
        if (onLoginError) {
          onLoginError(data.message || "Login failed."); // Call parent error callback
        }
      }
    } catch (err) {
      console.error("Network or server error:", err);
      setError("A network error occurred. Please try again.");
      if (onLoginError) {
        onLoginError("Network error."); // Call parent error callback for network issues
      }
    } finally {
      setLoading(false); // Always stop loading, whether success or failure
    }
  };

  return (
    // Outer container: Flexbox to center content, min-h to take full height, padding and light background
    <div
      className="flex items-center justify-center p-4 bg-gray-100 "
      style={{ minHeight: contentHeight }} // Removed inline minHeight and used Tailwind's min-h-screen for full viewport height
      // You can keep style={{ minHeight: contentHeight }} if contentHeight is dynamically determined elsewhere
      // and overrides min-h-screen when needed.
    >
      {/* Card container: Centered, responsive width, padding, shadow, rounded corners */}
      <div className="w-full max-w-md bg-white p-6 sm:p-8 rounded-xl shadow-lg border border-gray-200">
        <h2 className="text-xl sm:text-3xl font-extrabold text-center text-gray-800 mb-6">
          Login
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          {" "}
          {/* Vertical spacing between form elements */}
          {/* Email Input Group */}
          <div className="form-group">
            <label
              htmlFor="email"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Email:
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={handleEmailChange}
              required
              disabled={loading}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-150 ease-in-out"
            />
          </div>
          {/* Password Input Group with Toggle */}
          <div className="form-group relative">
            <label
              htmlFor="password"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Password:
            </label>
            <input
              type={`${showPassword ? "text" : "password"}`}
              id="password"
              value={password}
              onChange={handlePasswordChange}
              required
              disabled={loading}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent pr-10 transition duration-150 ease-in-out" // pr-10 for eye icon space
            />
            <span
              onClick={togglePassword}
              className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500 cursor-pointer pt-6" // pt-6 to align with input text
            >
              {!showPassword ? (
                <FaEyeSlash className="h-5 w-5" />
              ) : (
                <FaEye className="h-5 w-5" />
              )}
            </span>
          </div>
          {/* Error Message */}
          {error && (
            <p className="text-red-600 text-sm text-center -mt-2">{error}</p>
          )}
          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition ease-in-out duration-150 font-semibold text-lg"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
