import React from 'react';
import { useAuth } from './AuthContext'; // Context 가져오기
import './DevButton.css'; // 스타일 정의

const DevButton = () => {
  const { login } = useAuth();

  const handleDebugLogin = () => {
    // 테스트용 로그인 데이터
    const mockUser = {
      username: 'testuser',
      student_Id: '23',
    };
    login(mockUser); // 로그인 상태 강제 ON
    alert('로그인 상태가 강제 ON되었습니다. (테스트 사용자)');
  };

  return (
    <button className="debug-login-button" onClick={handleDebugLogin}>
      Debug Login
    </button>
  );
};

export default DevButton;
