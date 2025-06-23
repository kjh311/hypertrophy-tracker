import "./styles/App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Welcome from "./components/Welcome";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

function App() {
  return (
    <div className="App">
      <Router>
        <Navbar />
        <Routes>
          <Route
            exact
            path="/"
            // element={<Home contentHeight={contentHeight} />}
            element={<Welcome />}
          />
        </Routes>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
