import React from 'react'
import { Outlet,NavLink, useNavigate} from 'react-router-dom'
import { useAuthStore } from '../store/AuthStore';
import '../Customer_Css/Sidebar.css';
import { useSelector } from 'react-redux';
import profile from '../assests/profile.jpg'


function Sidebar() {
 

 
  const navigate=useNavigate();
    const { logout,user } = useAuthStore();
    const handleLogout = () => {
        logout();
    }; 
    const profilehandler=()=>{
      navigate("seeprofile");
    }
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
     
    </div>
    <div className="w-full flex flex-col items-start justify-start ">
    <div className="bg-blue-200 h-32 w-full text-4xl py-6 px-9 flex items-center justify-between font-bold shadow-xl">
        <p>Welcome {user.name}!</p>
        <div className="h-16 w-16 bg-red-200 rounded-full cursor-pointer object-cover" onClick={profilehandler}>
          
          < img src={user ? user.image:profile}
           
            style={{ borderRadius: '50%',width:'100%',height:'100%' }}/>
            </div>
    </div>
      <div className="main-content">
        <Outlet/>
      </div>
    </div>
    </div>
  )
}

export default Sidebar
