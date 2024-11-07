import React from 'react'
import { Outlet,NavLink} from 'react-router-dom'
import { useAuthStore } from '../store/AuthStore';
import '../Customer_Css/Sidebar.css';


function Sidebar() {
    const { logout } = useAuthStore();
    const handleLogout = () => {
        logout();
    }; 
  return (
    <div className="app-container">
    <div className="sidebar">
      <h2 className="customer-name">InvenTrackUp</h2>
      <nav className="menu">
        <NavLink to="home">Home</NavLink>
        <NavLink to="products">Products</NavLink>
        <NavLink to="cart">Cart</NavLink>
        <NavLink to="wishlist">Wishlist</NavLink>
        <NavLink to="orders">Orders</NavLink>
      </nav>
      <button className="logout" onClick={handleLogout}> Logout </button>
      <div className="home-container">
        <Outlet />
    </div>
    </div>
    </div>
  )
}

export default Sidebar
