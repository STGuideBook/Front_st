import React from 'react';
import './LoginModal.css';

const LoginModal = ({ closeModal, openSignupModal }) => {
    const handleOverlayClick = (event) => {
        if (event.target === event.currentTarget) {
            closeModal();
        }
    };

    return (
        <div className="login-modal-overlay" onClick={handleOverlayClick}>
            <div className="login-modal-content">
                <h2 className="login-modal-title">로그인</h2>
                <form>
                    <div className="login-form-group">
                        <label htmlFor="username">아이디</label>
                        <input
                            type="text"
                            id="username"
                            placeholder="아이디 입력(6~20자)"
                            required
                        />
                    </div>
                    <div className="login-form-group">
                        <label htmlFor="password">비밀번호</label>
                        <input
                            type="password"
                            id="password"
                            placeholder="비밀번호 입력(영문, 숫자, 특수문자 포함 8~20자)"
                            required
                        />
                    </div>
                    <div className="login-form-options">
                        <div className="login-remember-container">
                            <input type="checkbox" className="login-checkbox" />
                            <span className="login-remember">아이디 기억하기</span>
                        </div>
                        <a
                            className="login-signup-link"
                            onClick={(e) => {
                                e.preventDefault();
                                openSignupModal(); // 회원가입 모달 열기
                            }}
                        >
                            회원가입
                        </a>
                    </div>
                    <button type="submit" className="login-btn">
                        로그인
                    </button>
                </form>
            </div>
        </div>
    );
};

export default LoginModal;
