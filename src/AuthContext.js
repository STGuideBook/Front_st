import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userInfo, setUserInfo] = useState({ username: '', student_Id: '' });

  // sessionStorage에서 초기 상태 불러오기
  useEffect(() => {
    const storedSuccess = sessionStorage.getItem('success') === 'true';
    const storedUsername = sessionStorage.getItem('username');
    const storedStudentId = sessionStorage.getItem('student_Id');

    if (storedSuccess) {
      setIsAuthenticated(true);
      setUserInfo({ username: storedUsername, student_Id: storedStudentId });
    }
  }, []);

  // 로그인 처리
  const login = ({ username, student_Id }) => {
    setIsAuthenticated(true);
    setUserInfo({ username, student_Id });

    // sessionStorage에 저장
    sessionStorage.setItem('success', 'true');
    sessionStorage.setItem('username', username);
    sessionStorage.setItem('student_Id', student_Id);
  };

  // 로그아웃 처리
  const logout = () => {
    setIsAuthenticated(false);
    setUserInfo({ username: '', student_Id: '' });

    // sessionStorage 초기화
    sessionStorage.removeItem('success');
    sessionStorage.removeItem('username');
    sessionStorage.removeItem('student_Id');
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, userInfo, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
