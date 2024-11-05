import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Sidebar.css';

const Sidebar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    
    alert("You have been logged out."); 
    navigate('/');
  };

  return (
    <div className="sidebar">
      <h2 className="customer-name">InvenTrackUp</h2>
      <nav className="menu">
        <Link to="/">Home</Link>
        <Link to="/products">Products</Link>
        <Link to="/cart">Cart</Link>
        <Link to="/wishlist">Wishlist</Link>
        <Link to="/orders">Orders</Link>
      </nav>
      <button className="logout" onClick={handleLogout}> Logout </button>
    </div>
  );
};

export default Sidebar;
