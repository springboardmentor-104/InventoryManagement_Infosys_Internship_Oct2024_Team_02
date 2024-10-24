import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; 
import "./../styles/LoginForm.css"; 
import dashboardImage from "./../assets/dashboard.png";

function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate(); 

  const handleLogin = (e) => {
    e.preventDefault();
  
    if (email && password) {
    
      navigate("/home"); 
    } else {
      alert("Please enter both email and password");
    }
  };

  const handleGoogleLogin = () => {
  
    alert("Logging in with Google...");
   
    navigate("/home");
  };

  const handleFacebookLogin = () => {
  
    alert("Logging in with Facebook...");
   
    navigate("/home");
  };

  return (
    <div className="login-container">
      <div className="login-right">
       
       <p className="tagline">Connect with every application. Everything you need in an easily customizable dashboard.</p>
       <img src={dashboardImage} alt="Dashboard" className="dashboard-image" />
     </div>
      <div className="login-left">
        <h2>Log in to your Account</h2>
        <p>Welcome back! Select method to log in:</p>
        <div className="social-login">
          <button className="google-btn" onClick={handleGoogleLogin}>
            Google
          </button>
          <button className="facebook-btn" onClick={handleFacebookLogin}>
            Facebook
          </button>
        </div>
        <div className="or-divider">
          <span>or continue with email</span>
        </div>
        <form onSubmit={handleLogin}>
          <input
            type="email"
            placeholder="Email"
            className="input-field"
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            required
          />
          <input
            type="password"
            placeholder="Password"
            className="input-field"
            value={password} 
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <label>
            <input type="checkbox" /> Remember me
          </label>
          <button type="submit" className="login-btn">Log In</button>
        </form>
        <p className="forgot-password">
          <a href="/forgot-password">Forgot Password?</a> 
        </p>
        <p className="footer-text">
          Don't have an account? <a href="#">Create an account</a>
        </p>
      </div>
      
    </div>
  );
}

export default LoginForm;
