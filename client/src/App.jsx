import React from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Signup from './Signup';
import Login from './Login';
import ForgotPassword from './ForgotPassword';
import ResetPassword from './ResetPassword';
import Home from './Home'

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/register' element={<Signup />} />
                <Route path='/login' element={<Login />} />
                <Route path='/' element={<Signup />} />
                <Route path='/forgot-password' element={<ForgotPassword />} />
                <Route path='/reset-password/:id/:token' element={<ResetPassword />} />
                <Route path='/home' element={<Home />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
