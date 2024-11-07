
import{Route,Routes,Router} from 'react-router-dom';
import SignUpPage from './pages/SignUpPage';
import LoginPage from './pages/LoginPage';
import EmailVerificationPage from './pages/EmailVerificationPage';
import {Toaster} from 'react-hot-toast';
import { useAuthStore } from './store/AuthStore';
import { useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import CustomerPage from './pages/CustomerPage';
import DashbaordPage from './Admin_pages/DashbaordPage';
import AdminPage from './pages/AdminPage';
import Cart from './Customer_Pages/Cart';
import Products from './Customer_Pages/Products';
import Wishlist from './Customer_Pages/Wishlist';
import Sidebar from './Componeents/Sidebar'
import HomePage from './Customer_Pages/HomePage';
import Orders from './Customer_Pages/Orders';

import ForgotPasswordPage from './pages/ForgotPasswordPage';
import ResetPasswordPage from './pages/ResetPasswordPage';



// protect routes
const ProtectedRoute = ({ children }) => {
	const { isAuthenticated, user } = useAuthStore();

	if (!isAuthenticated) {
		return <Navigate to='/login' replace />;
	}

	if (!user.isVerified) {
		return <Navigate to='/verify-email' replace />;
	}

	return children;
};


//redirect authenticated user to homepage
const RedirectedAuthenticatedUser=({children})=>{
  const {isAuthenticated,user}=useAuthStore();
  if(isAuthenticated && user.isVerified){
    if (user.role === 'Admin') {
      return <Navigate to={`/admin/dashboard`} replace />;  // Redirect to admin dashboard
    } else if (user.role === 'Customer') {
      return <Navigate to={`/customer/home`} replace />;  // Redirect to customer home page
    }
  }

  return children;
}


function App() {
  
const{isCheckingAuth,checkAuth,isAuthenticated,user}=useAuthStore()
useEffect(()=>{
  checkAuth()
},[checkAuth])


console.log("isAuthenticated",isAuthenticated);
console.log("user",user);

  return (
    
   
   

    <Routes>
        <Route path="/" element={<LandingPage/>} />
        <Route path="/signup" element={<RedirectedAuthenticatedUser><SignUpPage/></RedirectedAuthenticatedUser>} />
        <Route path="/login" element={<RedirectedAuthenticatedUser><LoginPage/></RedirectedAuthenticatedUser>} />
        <Route path="/verify-email" element={<EmailVerificationPage/>} />
        <Route path="/forgot-password" element={<RedirectedAuthenticatedUser><ForgotPasswordPage/></RedirectedAuthenticatedUser>} />
        <Route path="/reset-password/:token" element={<RedirectedAuthenticatedUser><ResetPasswordPage/></RedirectedAuthenticatedUser>} />

       
        <Route path="/customer/*" element={<CustomerPage/>} />
        <Route path="/home" element={<HomePage />}/>
        <Route path="/products" element={<Products />}/>
        <Route path="/cart" element={<Cart />}/>
        <Route path="wishlist" element={<Wishlist />}/>
        <Route path="orders" element={<Orders />}/>
       

        
        <Route>
        <Route path="/admin/*" element={<ProtectedRoute><AdminPage/></ProtectedRoute>} />
        <Route path="dashboard" element={<DashbaordPage />} />
        
        </Route>
    </Routes>
   
    
    
    
  )
}

export default App
