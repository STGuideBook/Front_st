import React, { useState } from 'react';
import './App.css';
import Header from './Header';
import Footer from './Footer';
import { Outlet } from 'react-router-dom';


function App() {
  return (
    <div className='body'>
      <div className="wrap-container">
        <Header></Header>
        <div className="contents">
          <Outlet />
        </div>
      </div>
      <Footer></Footer>
    </div>
  );
}

export default App;