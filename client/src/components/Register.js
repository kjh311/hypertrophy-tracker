import React, { useState, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Input from "./Input";
import Button from "./Button";
import { LoggedInContext } from "../App";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const Register = ({ contentHeight }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  // const [dayTheme] = useContext(DayTheme);
  const [showPassword, setShowPassword] = useState(false);
  // const { triggerFadeOut, setTriggerFadeOut } = useContext(FadeContext);
  const [loggedIn, setLoggedIn] = useContext(LoggedInContext);
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

    try {
      const response = await axios.post(url, {
        name,
        email,
        password,
      });

      const { token, user, message } = response.data;

      localStorage.setItem("hypertrophy-token", token);
      localStorage.setItem("hypertrophy-username", user.name);

      setMessage(message);
      setLoggedIn(true);
      navigate("/dashboard");
    } catch (error) {
      setMessage(
        error.response?.data?.error ||
          error.response?.data?.message ||
          "Something went wrong"
      );
    }
  };

  const capitalizeFirstLetter = (e) => {
    let string = e.target.value;
    setName(string.charAt(0).toUpperCase() + string.slice(1));
  };

  return (
    <div className="register-container" style={{ minHeight: contentHeight }}>
      <div className="register-card rounded-xl pt-3 pb-3">
        <h2 className="text-lg sm:text-2xl font-bold text-center mb-2 sm:mb-6">
          Create an Account
        </h2>
        <form
          onSubmit={handleSubmit}
          className="flex justify-center p-2 m-2 bg-blue-200"
        >
          <input
            type="text"
            value={name}
            className="p-2 m-2"
            required
            placeholder="Enter your First Name"
            onChange={capitalizeFirstLetter}
          />
          <br />
          <br />
          <input
            type="email"
            value={email}
            placeholder="Enter your Email"
            required
            className="p-2 m-2"
            onChange={(e) => setEmail(e.target.value)}
          />
          <br />
          <input
            type={`${showPassword ? "text" : "password"}`}
            value={password}
            placeholder="Enter your Password"
            required
            className="p-2 m-2"
            onChange={(e) => setPassword(e.target.value)}
          />
          <br />
          <div onClick={togglePassword} className="eye-icons">
            {!showPassword ? <FaEyeSlash /> : <FaEye />}
          </div>
          <button type="submit" className="p-2 m-2 bg-red-500">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;
