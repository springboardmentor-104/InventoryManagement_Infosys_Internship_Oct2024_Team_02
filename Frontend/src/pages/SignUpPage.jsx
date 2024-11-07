
import React from 'react'
import {Link, useNavigate} from 'react-router-dom';
import { useState } from 'react';
import { useAuthStore } from '../store/AuthStore';
import '../Css/LoginForm.css';

import Signup_img from '../assests/Signup_img.png';


function SignUpPage() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [role, setRole] = useState("");
	const [password, setPassword] = useState("");
    const navigate=useNavigate();
    const {signup,error}=useAuthStore();
   

    const handleSignUp = async (e) => {
		e.preventDefault();
        try {
			await signup(name,role,email,password);
			navigate("/verify-email");
		} catch (error) {
			console.log(error);
		}
    }
    return (
      <div className="Signup-container">
      <div className="login-container">
        <div className="login-right">
         
          <img src={Signup_img} alt="Dashboard" className="dashboard-image" />
        </div>
        <div className="login-left">
          <h2>Create an Account</h2>
          <p className="welcome">  Welcome! Please fill in the details to sign up:</p>
          <form onSubmit={handleSignUp}>
            <input
              type="text"
              placeholder="Name"
              className="input-field"
              value={name}
              onChange={(e) => setName(e.target.value)} 
              required
            />
            <select
            className="input-field"
              value={role}
              onChange={(e) => setRole(e.target.value)}>
              <option value="" >Select Role</option>
              <option value="Admin">Admin</option>
              <option value="Customer">Customer</option>
            </select>
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
            <button type="submit" className="login-btn">Sign Up</button>
          </form>
         
          <p className="footer-text">
            Already have an account?
            <Link to={"/login"} >
              Login
            </Link>
          </p>
        </div>
      </div>
      </div>
    );
}

export default SignUpPage
