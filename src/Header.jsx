import React, { useState } from "react";
import "./Header.css";
import { Link } from "react-router-dom";
import { useAuth } from "./AuthContext"; // Context 가져오기
import LoginModal from "./login/LoginModal";
import SignupModal from "./login/SignupModal";

const Header = () => {
  const { isAuthenticated, userInfo, logout } = useAuth(); // 로그인 상태와 사용자 정보 가져오기
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false); // 로그인 모달 상태
  const [isSignupModalOpen, setIsSignupModalOpen] = useState(false); // 회원가입 모달 상태
  const [isMenuOpen, setIsMenuOpen] = useState(false); // 메뉴 모달 상태

  // 로그인 모달 열기
  const openLoginModal = () => {
    setIsLoginModalOpen(true);
    setIsSignupModalOpen(false); // 회원가입 모달 닫기
  };

  // 회원가입 모달 열기
  const openSignupModal = () => {
    setIsSignupModalOpen(true);
    setIsLoginModalOpen(false); // 로그인 모달 닫기
  };

  // 모달 닫기
  const closeModal = () => {
    setIsLoginModalOpen(false);
    setIsSignupModalOpen(false);
  };

  // 메뉴 모달 토글
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // 메뉴 모달 닫기
  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <div className="header">
      <nav>
        <div className="nav-bar">
          <div className="nav-btns">
            <Link to={"/eat"}>먹거리</Link>
            <Link to={"/study"}>학업</Link>
            <Link to={"/housing"}>주거</Link>
            <Link to={"/tip"}>팁게시판</Link>
          </div>
          <div className="nav-logo">
            <a href="/"><img src="/assets/img/seoultech-logo.svg" alt="Seoultech Logo" /></a>
          </div>
          <div
            className="nav-login"
            onClick={isAuthenticated ? toggleMenu : openLoginModal} // 로그인 상태에 따라 동작 변경
          >
            {isAuthenticated ? (
              <>
                <a>익명의 {userInfo.student_Id}학번</a>
                <img className="login-icon" src="/assets/img/24.svg" alt="User Icon" />
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

      {/* 로그인 모달 */}
      {!isAuthenticated && isLoginModalOpen && (
        <LoginModal closeModal={closeModal} openSignupModal={openSignupModal} />
      )}

      {/* 회원가입 모달 */}
      {!isAuthenticated && isSignupModalOpen && (
        <SignupModal closeModal={closeModal} />
      )}

      {/* 메뉴 모달 (로그인 상태일 때만 표시) */}
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
