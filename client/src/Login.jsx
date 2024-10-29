import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import logo from './logo.png';
import cm from './communication.png';
import img from './login-img.jpg';
import './css/App.css';

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post('http://localhost:3001/login', { email, password })
            .then((res) => {
                console.log(res);
                if (res.data === "Success") {
                    navigate('/home');
                }
            })
            .catch((err) => console.log(err));
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
                    <h2>Welcome!</h2>
                    <form className="form" onSubmit={handleSubmit}>
                        <div className="login-email">
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
                        <div className="login-password">
                            <label htmlFor="password">Password<span className="required">*</span></label>
                            <input
                                type="password"
                                id="password"
                                name="password"
                                required
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                            <div className="forget-pass">
                                <Link className="link" to="/forgot-password">Forgot Password?</Link>
                            </div>
                        </div>
                        <button className="login" type="submit">Login Now</button>
                    </form>
                    <div className="or-container">
                        <span>or login with</span>
                    </div>
                    <button className="google-login">
                        <img src={cm} alt="Google Logo" /> Google
                    </button>
                    <p className="signup">
                        Don't have an account? <Link to="/register">Signup</Link>
                    </p>
                </div>
            </div>
        </div>
    );
}

export default Login;
