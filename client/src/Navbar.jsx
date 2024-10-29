import React from 'react';
import './css/Navbar.css';

const Navbar = ({ role, onSignOut }) => {
    return (
        <nav className="navbar">
            <h2>Inventory Management</h2>
            <div className="role-display">
                Role: {role || 'Guest'}
            </div>
            <button onClick={onSignOut} className="signout-btn">Sign Out</button>
        </nav>
    );
};

export default Navbar;
