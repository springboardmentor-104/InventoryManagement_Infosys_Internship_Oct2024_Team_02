import React, { useState } from "react";
import "./../styles/ForgotPassword.css"; 

function ForgotPassword() {
  const [email, setEmail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email) {
      alert(`Password reset link sent to ${email}`);
      setEmail(""); 
    } else {
      alert("Please enter your email address.");
    }
  };

  return (
    <div className="forgot-password-container">
      <div className="form-wrapper">
        <h2>Forgot Password</h2>
        <p>Please enter your email address to receive password reset instructions.</p>
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="input-field" 
          />
          <button type="submit" className="submit-btn">Send Reset Link</button>
        </form>
        <p className="back-to-login">
          Remembered your password? <a href="/">Back to Login</a>
        </p>
      </div>
    </div>
  );
}

export default ForgotPassword;
