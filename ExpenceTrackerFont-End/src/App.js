
import React, {useCallback} from 'react'
import './App.css';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Alert from '@mui/material/Alert';
import { Routes, Route, BrowserRouter } from "react-router-dom";
import { useState } from "react";
import Protected from './components/Security';
import Home from './pages/Home';
import MaxExpence from './pages/MaxExpence';


function App() {

 

  return (
    <div className="App">
      <BrowserRouter>
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='login' element={<Login />} />
        <Route path='maxExpence' element={<MaxExpence />} />
        <Route path='signup' element={<Signup />} />
        <Route path='dashboard'
          element={
          <Protected isLoggedIn={localStorage.getItem('authenticated')}>
          <Home />
          </Protected>
          }
        />
      </Routes>
      </BrowserRouter>
     
    </div>
  );
}

export default App;
