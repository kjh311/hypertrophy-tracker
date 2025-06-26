import React, { useState, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
// Assuming Input and Button are custom components,
// if they are not using Tailwind, you might need to adjust their internal styling.
// For this example, I'll style the raw inputs directly.
// import Input from "./Input"; // Not directly used in the provided code
// import Button from "./Button"; // Not directly used in the provided code
import { LoggedInContext } from "../App";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const Register = ({ contentHeight }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [, setLoggedIn] = useContext(LoggedInContext); // Destructure loggedIn but not using it directly here
  const navigate = useNavigate();

  const togglePassword = () => {
    setShowPassword((prev) => !prev);
  };

  const url =
    process.env.NODE_ENV === "development"
      ? `http://localhost:8080/api/auth/register`
      : `https://mern-expense-tracker-v5y1.onrender.com/api/auth/register`;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage(""); // Clear previous messages

    try {
      const response = await axios.post(url, {
        name,
        email,
        password,
      });

      const { token, user, message } = response.data;

      localStorage.setItem("hypertrophy-token", token);
      localStorage.setItem("hypertrophy-username", user.name);

      setMessage(message); // Success message
      setLoggedIn(true);
      navigate("/dashboard");
    } catch (error) {
      setMessage(
        error.response?.data?.error ||
          error.response?.data?.message ||
          "Registration failed. Please try again."
      );
    }
  };

  const capitalizeFirstLetter = (e) => {
    let string = e.target.value;
    setName(string.charAt(0).toUpperCase() + string.slice(1));
  };

  return (
    // Outer container: Flexbox to center content, min-h to take full height
    <div
      className="flex items-center justify-center p-4 bg-gray-100" // Added p-4 padding and light gray background
      style={{ minHeight: contentHeight }}
    >
      {/* Card container: Centered, responsive width, padding, shadow, rounded corners */}
      <div className="w-full max-w-md bg-white p-6 sm:p-8 rounded-xl shadow-lg border border-gray-200">
        <h2 className="text-xl sm:text-3xl font-extrabold text-center text-gray-800 mb-6">
          Create an Account
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          {" "}
          {/* Vertical spacing between form elements */}
          {/* Name Input */}
          <input
            type="text"
            value={name}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            required
            placeholder="Enter your First Name"
            onChange={capitalizeFirstLetter}
          />
          {/* Email Input */}
          <input
            type="email"
            value={email}
            placeholder="Enter your Email"
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            onChange={(e) => setEmail(e.target.value)}
          />
          {/* Password Input with Toggle */}
          <div className="relative">
            <input
              type={`${showPassword ? "text" : "password"}`}
              value={password}
              placeholder="Enter your Password"
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent pr-10" // pr-10 for eye icon space
              onChange={(e) => setPassword(e.target.value)}
            />
            <span
              onClick={togglePassword}
              className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500 cursor-pointer"
            >
              {!showPassword ? (
                <FaEyeSlash className="h-5 w-5" />
              ) : (
                <FaEye className="h-5 w-5" />
              )}
            </span>
          </div>
          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition ease-in-out duration-150 font-semibold"
          >
            Submit
          </button>
        </form>

        {/* Message Display (Success/Error) */}
        {message && (
          <p
            className={`mt-4 text-center ${
              message.includes("successful") ? "text-green-600" : "text-red-600"
            }`}
          >
            {message}
          </p>
        )}
      </div>
    </div>
  );
};

export default Register;
