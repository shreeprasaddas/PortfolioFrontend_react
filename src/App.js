
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import React from 'react';
import NavBar from './component/NavBar';
import Background from './component/BackgroundHome';


import Contact from './component/conatac-page';

import './App.css'; 
import SecondHome from './component/second-home';
import Home from './component/home-page';
import Portfolio from './component/portfolio-page';
import AuthPage from './component/dashboard/components/AuthPage';

function App() {
  return (
    <Router>
      
        <NavBar />
        <Routes>
          <Route path="/" element={<SecondHome />} />
          <Route path="/about" element={< Home/>} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/portfolio" element={<Portfolio />} />
          <Route path='/login' element={<AuthPage />} />
        </Routes>
      
     
    </Router>
  );
}

export default App;