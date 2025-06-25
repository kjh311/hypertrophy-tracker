import React, { useState } from "react";
import "./styles/App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Welcome from "./components/Welcome";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Login from "./components/Login";
import Register from "./components/Register";
import Dashboard from "./components/Dashboard";

export const LoggedInContext = React.createContext();

function App() {
  const [loggedIn, setLoggedIn] = useState(
    !!localStorage.getItem("hypertrophy-token")
  );

  return (
    <div className="App">
      <LoggedInContext.Provider value={[loggedIn, setLoggedIn]}>
        <Router>
          <Navbar />
          <Routes>
            <Route
              exact
              path="/"
              // element={<Home contentHeight={contentHeight} />}
              element={<Welcome />}
            />
            <Route
              exact
              path="/register"
              element={
                <Register
                // contentHeight={contentHeight}
                // formData={formData}
                // setFormData={setFormData}
                // refreshFlag={refreshFlag}
                // setRefreshFlag={setRefreshFlag}
                // loading={loading}
                // setLoading={setLoading}
                />
              }
            />
            <Route exact path="/login" element={<Login />} />
            <Route exact path="/dashboard" element={<Dashboard />} />
          </Routes>
          <Footer />
        </Router>
      </LoggedInContext.Provider>
    </div>
  );
}

export default App;
