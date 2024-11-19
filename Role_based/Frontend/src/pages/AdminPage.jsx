import React from 'react'
import { Outlet,NavLink, Navigate } from 'react-router-dom'
import { useAuthStore } from '../store/AuthStore';


function AdminPage() {
    const { logout } = useAuthStore();
    const handleLogout = () => {
        logout();
    };  
   
  return (
    <div>
      Hi admin
       <NavLink
            to="dashboard">
            <button
					
					onClick={handleLogout}
					className='w-37 text-3xl py-3 px-4 bg-gradient-to-r from-blue-500 to-sky-600 text-white 
				font-bold rounded-lg shadow-lg hover:from-blue-600 hover:to-sky-700
				 focus:outline-none  focus:ring-blue-500 focus:ring-2 '
				>
					Logout
				</button>
        </NavLink>
        <Outlet/>
    </div>
  );
};

export default AdminPage
