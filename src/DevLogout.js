import React from 'react';
import { useAuth } from './AuthContext'; // Context 가져오기
import './DevLogout.css';

const DebugLogout = () => {
  const { logout } = useAuth();

  const handleDebugLogout = () => {
    logout(); // 강제로 로그아웃
    alert('로그아웃 상태가 강제 적용되었습니다.');
  };

  return (
    <button className="debug-logout-button" onClick={handleDebugLogout}>
      Debug Logout
    </button>
  );
};

export default DebugLogout;
