import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../AuthContext'; // Context 가져오기
import './LoginModal.css';

const LoginModal = ({ closeModal, openSignupModal }) => {
  const [formData, setFormData] = useState({ username: '', password: '' });
  const [rememberMe, setRememberMe] = useState(false); // 아이디 기억하기 상태
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth(); // Context의 login 함수 가져오기

  // 컴포넌트가 렌더링될 때 기억된 아이디를 불러옵니다.
  useEffect(() => {
    const rememberedUsername = localStorage.getItem('rememberedUsername');
    if (rememberedUsername) {
      setFormData((prev) => ({ ...prev, username: rememberedUsername }));
      setRememberMe(true); // 체크박스도 활성화
    }
    console.log('Remembered Username:', rememberedUsername); // 디버깅용 로그
  }, []);

  const handleOverlayClick = (event) => {
    if (event.target === event.currentTarget) {
      closeModal();
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleCheckboxChange = (e) => {
    setRememberMe(e.target.checked); // 체크박스 상태 업데이트
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      // user/login으로 로그인 요청
      const response = await axios.post('https://stguidebook-649b3dde2d26.herokuapp.com/user/login', formData);

      console.log('Server Response:', response.data); // 서버 응답 구조 확인

      if (response.data.status === 'success') {
        const { username, student_Id } = response.data;

        // Context와 sessionStorage에 저장
        login({ username, student_Id });

        console.log('Logged in User Info:', { username, student_Id }); // 디버깅용 로그

        // rememberMe 체크 시 localStorage에 아이디 저장
        if (rememberMe) {
          localStorage.setItem('rememberedUsername', username);
        } else {
          localStorage.removeItem('rememberedUsername'); // 체크가 해제되었다면 제거
        }

        alert('로그인 성공!');
        closeModal();
      } else {
        setError('로그인 실패: 아이디와 비밀번호를 확인하세요.');
      }
    } catch (err) {
      console.error('로그인 오류:', err);
      setError('로그인 중 오류가 발생했습니다. 다시 시도해주세요.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="login-modal-overlay" onClick={handleOverlayClick}>
      <div className="login-modal-content">
        <h2 className="login-modal-title">로그인</h2>
        <form onSubmit={handleSubmit}>
          <div className="login-form-group">
            <label htmlFor="username">아이디</label>
            <input
              type="text"
              id="username"
              name="username"
              placeholder="아이디 입력(6~20자)"
              value={formData.username}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="login-form-group">
            <label htmlFor="password">비밀번호</label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="비밀번호 입력(영문, 숫자, 특수문자 포함 8~20자)"
              value={formData.password}
              onChange={handleInputChange}
              required
            />
          </div>
          {error && <p className="login-error">{error}</p>}
          <div className="login-form-options">
            <div className="login-remember-container">
              <input
                type="checkbox"
                className="login-checkbox"
                id="rememberMe"
                checked={rememberMe}
                onChange={handleCheckboxChange}
              />
              <label htmlFor="rememberMe" className="login-remember">
                아이디 기억하기
              </label>
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
          <button
            type="submit"
            className={`login-btn ${isLoading ? 'login-btn-loading' : ''}`}
            disabled={isLoading}
          >
            {isLoading ? '로그인 중...' : '로그인'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginModal;