import React, { useState } from 'react';
import './App.css';
import Header from './Header';
import Footer from './Footer';
import { Outlet, useLocation } from 'react-router-dom';


function App() {
  const location = useLocation();

  const isInside = location.pathname === '/study/sugang' || location.pathname === '/eat/content';

  return (
    <div className='body'>
      <div className="wrap-container"  style={{
      backgroundColor: isInside ? '#627DFF' : 'transparent',
    }}>
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