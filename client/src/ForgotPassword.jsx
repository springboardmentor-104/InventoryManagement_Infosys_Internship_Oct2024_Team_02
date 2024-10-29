import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function ForgotPassword() {
    const [email, setEmail] = useState('');
    const [error, setError] = useState(''); 
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(''); 

        try {
            const result = await axios.post('http://localhost:3001/forgot-password', { email });
            if (result.data.Status === "Success") {
                navigate("/login");
            } else {
                setError(result.data.Message || "An error occurred. Please try again.");
            }
        } catch (err) {
            console.error(err);
            setError("Failed to send request. Please try again."); 
        }
    };

    const formStyle = {
        maxWidth: '300px',
        margin: '0 auto',
        padding: '20px',
        border: '1px solid #ccc',
        borderRadius: '5px',
        textAlign: 'center',
    };

    const inputStyle = {
        width: '100%',
        padding: '10px',
        margin: '10px 0',
        boxSizing: 'border-box',
    };

    const buttonStyle = {
        width: '100%',
        padding: '10px',
        backgroundColor: '#007bff',
        color: 'white',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
    };

    return (
        <div style={{ textAlign: 'center' }}>
            <h2>Forgot Password</h2>
            {error && <div style={{ color: 'red' }}>{error}</div>} {/* Error message display */}
            <form onSubmit={handleSubmit} style={formStyle}>
                <div>
                    <input
                        type="email"
                        placeholder="Email"
                        required
                        style={inputStyle}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <button type="submit" style={buttonStyle}>
                    Send
                </button>
            </form>
        </div>
    );
}

export default ForgotPassword;
