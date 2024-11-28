import React, { useState } from "react";
import "./Header.css";
import { Link } from "react-router-dom";
import LoginModal from "./login/LoginModal";
import SignupModal from "./login/SignupModal";

const Header = () => {
    const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
    const [isSignupModalOpen, setIsSignupModalOpen] = useState(false);

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
                    <div className="nav-login" onClick={openLoginModal}>
                        <a>로그인</a>
                        <img className="login-icon" src="/assets/img/person.svg" alt="Login Icon" />
                    </div>
                </div>
            </nav>

            {/* 로그인 모달 */}
            {isLoginModalOpen && (
                <LoginModal closeModal={closeModal} openSignupModal={openSignupModal} />
            )}

            {/* 회원가입 모달 */}
            {isSignupModalOpen && (
                <SignupModal closeModal={closeModal} />
            )}
        </div>
    );
};

export default Header;
