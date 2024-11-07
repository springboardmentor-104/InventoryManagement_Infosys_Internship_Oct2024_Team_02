import React from 'react'
import {Link} from 'react-router-dom';
import { useState } from 'react';
import { useAuthStore } from '../store/AuthStore';
import { useNavigate } from 'react-router-dom';
import '../Css/LoginForm.css';
import dashboardImage from '../assests/dashboard.png'

function LoginPage() {

    const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
    const Navigate = useNavigate(); 
    const{login,error}=useAuthStore();
    const handleLogin = async (e) => {
		e.preventDefault();
		await login(email, password);       
	};

    return (
        <div className="Signup-container">
        <div className="login-container">
          <div className="login-right">
           
            <img src={dashboardImage} alt="Dashboard" className="dashboard-image" />
          </div>
          <div className="login-left">
            <h2>Log in to your Account</h2>
            <p className="welcome">Welcome back!</p>
            
           
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
              {error && <p className='text-red-500 font-semibold mt-2 text-xl'>{error}</p>}
              <button type="submit" className="login-btn">Log In</button>
            </form>
            <p className="forgot-password">
              <a href="/forgot-password">Forgot Password?</a> 
            </p>
            <p className="footer-text">
              Don't have an account? <Link to="/signup">Create an account</Link> 
            </p>
          </div>
        </div>
        </div>
      );
}

export default LoginPage
