import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

function ResetPassword() {
  const [password, setPassword] = useState(''); 
  const navigate = useNavigate();
  const { id, token } = useParams();

  axios.defaults.withCredentials = true;
  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post(`http://localhost:3001/reset-password/${id}/${token}`, { password }, { withCredentials: true })
    .then(result => {
        if(result.data.Status === "Success"){
            navigate("/login");
        }
    })
    .catch(err => console.log(err));

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
      <h2>Reset Password</h2>
      <form onSubmit={handleSubmit} style={formStyle}>
        <div>
          <input
            type="password"
            placeholder="Enter new password"
            value={password} 
            required
            style={inputStyle}
            onChange={(e) => setPassword(e.target.value)} 
          />
        </div>
        <button type="submit" style={buttonStyle}>
          Update
        </button>
      </form>
    </div>
  );
}

export default ResetPassword;
