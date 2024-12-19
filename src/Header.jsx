import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import "./Header.css";
import { useAuth } from "./AuthContext"; // Context 가져오기
import LoginModal from "./login/LoginModal";
import SignupModal from "./login/SignupModal";

const Header = () => {
  const { isAuthenticated, userInfo, logout } = useAuth();
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isSignupModalOpen, setIsSignupModalOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const location = useLocation(); // 현재 경로 가져오기

  const openLoginModal = () => {
    setIsLoginModalOpen(true);
    setIsSignupModalOpen(false);
  };

  const openSignupModal = () => {
    setIsSignupModalOpen(true);
    setIsLoginModalOpen(false);
  };

  const closeModal = () => {
    setIsLoginModalOpen(false);
    setIsSignupModalOpen(false);
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  // student_Id에 따라 이미지 경로를 동적으로 설정
  const getStudentIcon = () => {
    if (!userInfo || !userInfo.student_Id) return "/assets/grade/first.svg"; // 기본 이미지
    const studentId = String(userInfo.student_Id);

    if (studentId.startsWith("24")) return "/assets/img/grade/first.svg"; // 24학번 이미지
    if (studentId.startsWith("23")) return "/assets/img/grade/second.svg"; // 23학번 이미지
    if (studentId.startsWith("22")) return "/assets/img/grade/third.svg"; // 22학번 이미지
    if (studentId.startsWith("21")) return "/assets/img/grade/fourth.svg"; // 22학번 이미지

    return "/assets/img/default.svg"; // 기본 이미지
  };

  return (
    <div className="header">
      <nav>
        <div className="nav-bar">
          <div className="nav-btns">
            <Link to="/eat" className={location.pathname === "/eat" ? "active" : ""}>
              먹거리
            </Link>
            <Link to="/study" className={location.pathname === "/study" ? "active" : ""}>
              학업
            </Link>
            <Link to="/housing" className={location.pathname === "/housing" ? "active" : ""}>
              주거
            </Link>
            <Link to="/tip" className={location.pathname === "/tip" ? "active" : ""}>
              팁게시판
            </Link>
          </div>
          <div className="nav-logo">
            <a href="/"><img src="/assets/img/seoultech-logo.svg" alt="Seoultech Logo" /></a>
          </div>
          <div
            className="nav-login"
            onClick={isAuthenticated ? toggleMenu : openLoginModal}
          >
            {isAuthenticated ? (
              <>
                <a>익명의 {userInfo.student_Id}학번</a>
                <img
                  className="login-icon"
                  src={getStudentIcon()}
                  alt="User Icon"
                />
              </>
            ) : (
              <>
                <a>로그인</a>
                <img className="login-icon" src="/assets/img/person.svg" alt="Login Icon" />
              </>
            )}
          </div>
        </div>
      </nav>

      {!isAuthenticated && isLoginModalOpen && (
        <LoginModal closeModal={closeModal} openSignupModal={openSignupModal} />
      )}
      {!isAuthenticated && isSignupModalOpen && (
        <SignupModal closeModal={closeModal} />
      )}
      {isMenuOpen && isAuthenticated && (
        <div className="menu-modal">
          <ul>
            <li onClick={() => { logout(); closeMenu(); }}>
              <img src="/assets/img/logout-icon.svg" alt="Logout" />
              로그아웃
            </li>
            <li>
              <img src="/assets/img/password-icon.svg" alt="Change Password" />
              비밀번호 변경
            </li>
            <li>
              <img src="/assets/img/delete-icon.svg" alt="Delete Account" />
              회원탈퇴
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default Header;