import React from 'react';
import './Header.css';
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <div className='header'>
      <nav>
        <div className="nav-bar">
          <div className="nav-btns">
            <Link to={"/eat"}>먹거리</Link>
            <Link to={"/study"}>학업</Link>
            <a>주거</a>
            <Link to={"/tip"}>팁게시판</Link>
          </div>
          <div className="nav-logo">
            <a href="/"><img src='assets/img/seoultech-logo.svg' alt="Seoultech Logo" /></a>
          </div>
          <div className="nav-login">
            <a>로그인</a>
            <img className="login-icon" src="assets/img/person.svg" alt="Login Icon" />
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Header;