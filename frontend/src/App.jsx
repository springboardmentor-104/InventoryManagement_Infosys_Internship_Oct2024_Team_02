import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginForm from "./components/LoginForm"; 
import HomePage from "./components/HomePage"; 
import ForgotPassword from "./components/ForgotPassword"; 

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<LoginForm />} /> {/* Root route for LoginForm */}
          <Route path="/home" element={<HomePage />} /> {/* "/home" route for HomePage */}
          <Route path="/forgot-password" element={<ForgotPassword />} /> {/* New route for ForgotPassword */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
