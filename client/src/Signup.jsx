import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import logo from './logo.png';
import cm from './communication.png';
import './css/App.css';
import img from './login-img.jpg';

function Signup() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null); // State for error handling
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post('http://localhost:3001/register', { name, email, password })
            .then(result => {
                console.log(result);
                // Navigate to OTP verification page after successful signup
                navigate('/verify-otp', { state: { email } });
            })
            .catch(err => {
                console.error(err);
                setError("Registration failed. Please try again."); // Set error message
            });
    };

    return (
        <div className="container">
            <div className="left-section">
                <h2>Manage your inventory easily</h2>
                <br />
                <div className="login-img">
                    <img src={img} alt="Inventory Illustration" />
                </div>
            </div>
            <div className="right-section">
                <div className="form-container">
                    <img src={logo} alt="Logo" className="logo-img" />
                    <h2>Create Your Account</h2>
                    <form className="form" onSubmit={handleSubmit}>
                        <div className="signup-name">
                            <label htmlFor="name">Name<span className="required">*</span></label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                required
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                        </div>
                        <div className="signup-email">
                            <label htmlFor="email">Email<span className="required">*</span></label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                        <div className="signup-password">
                            <label htmlFor="password">Password<span className="required">*</span></label>
                            <input
                                type="password"
                                id="password"
                                name="password"
                                required
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                        {error && <p className="error-message">{error}</p>} {/* Show error message */}
                        <button className="login" type="submit">Sign Up</button>
                    </form>
                    <div className="or-container">
                        <span>or sign up with</span>
                    </div>
                    <button className="google-login">
                        <img src={cm} alt="Google Logo" /> Google
                    </button>
                    <p className="signup">
                        Already have an account? <Link to="/login">Login</Link>
                    </p>
                </div>
            </div>
        </div>
    );
}

export default Signup;
