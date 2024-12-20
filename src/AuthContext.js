import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userInfo, setUserInfo] = useState({ username: '', student_Id: '' });
  const [isLoading, setIsLoading] = useState(true); // 로딩 상태 추가

  useEffect(() => {
    const storedSuccess = sessionStorage.getItem('success') === 'true';
    const storedUsername = sessionStorage.getItem('username') || '';
    const storedStudentId = sessionStorage.getItem('student_Id') || '';

    console.log("sessionStorage에서 불러온 값:", {
      storedSuccess,
      storedUsername,
      storedStudentId,
    });

    if (storedSuccess && storedUsername && storedStudentId) {
      setIsAuthenticated(true);
      setUserInfo({ username: storedUsername, student_Id: storedStudentId });
    }

    setIsLoading(false); // 로딩 완료
  }, []);

  const login = ({ username, student_Id }) => {
    if (!username || !student_Id) {
      console.error('Invalid login attempt: Missing username or student_Id.');
      return;
    }

    setIsAuthenticated(true);
    setUserInfo({ username, student_Id });

    sessionStorage.setItem('success', 'true');
    sessionStorage.setItem('username', username);
    sessionStorage.setItem('student_Id', student_Id);
  };

  const logout = () => {
    setIsAuthenticated(false);
    setUserInfo({ username: '', student_Id: '' });
    sessionStorage.clear();
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, userInfo, login, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};