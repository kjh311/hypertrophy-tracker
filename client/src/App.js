import React, { useState, useRef } from "react";
import "./styles/App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Welcome from "./components/Welcome";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Login from "./components/Login";
import Register from "./components/Register";
import Dashboard from "./components/Dashboard";
import ProtectedRoute from "./components/ProtectedRoute";
import UpdateHeights from "./components/UpdateHeights";

export const LoggedInContext = React.createContext();

function App() {
  const [loggedIn, setLoggedIn] = useState(
    !!localStorage.getItem("hypertrophy-token")
  );
  const navbarRef = useRef(null);
  const footerRef = useRef(null);
  const [contentHeight, setContentHeight] = useState("100vh");

  return (
    <div className="App">
      <LoggedInContext.Provider value={[loggedIn, setLoggedIn]}>
        <Router>
          <UpdateHeights
            navbarRef={navbarRef}
            footerRef={footerRef}
            setContentHeight={setContentHeight}
          />
          <Navbar ref={navbarRef} />
          <Routes>
            <Route
              exact
              path="/"
              // element={<Home contentHeight={contentHeight} />}
              element={<Welcome contentHeight={contentHeight} />}
            />
            <Route
              exact
              path="/register"
              element={
                <Register
                  contentHeight={contentHeight}
                  // formData={formData}
                  // setFormData={setFormData}
                  // refreshFlag={refreshFlag}
                  // setRefreshFlag={setRefreshFlag}
                  // loading={loading}
                  // setLoading={setLoading}
                />
              }
            />
            <Route
              exact
              path="/login"
              element={<Login contentHeight={contentHeight} />}
            />
            <Route
              exact
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <Dashboard
                    contentHeight={contentHeight}
                    // refreshFlag={refreshFlag}
                    // setRefreshFlag={setRefreshFlag}
                  />
                </ProtectedRoute>
              }
            />
          </Routes>
          <Footer ref={footerRef} />
        </Router>
      </LoggedInContext.Provider>
    </div>
  );
}

export default App;
