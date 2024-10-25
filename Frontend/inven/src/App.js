
import './App.css';

import Home from './Components/home'
import Landing from './Components/Landing';

import React,{useState} from 'react'
import {BrowserRouter, Routes,Route} from 'react-router-dom';
function App() {
  
  return (
    <>
  <BrowserRouter>
    <Routes>
      <Route path='/'element={<Landing/>}/>
      </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
