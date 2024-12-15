import React from 'react';
import './App.css';
import Header from './Header';
import Footer from './Footer';
import { Outlet, useLocation } from 'react-router-dom';
import { AuthProvider } from './AuthContext'; // AuthProvider 가져오기
import DevButton from './DevButton';
import DevLogout from './DevLogout';

function App() {
  const location = useLocation();

  const isInside = location.pathname === '/study/sugang' || location.pathname === '/eat/content';

  return (
    <AuthProvider> {/* AuthProvider로 전체를 감싸기 */}
      <div className="body">
        <div
          className="wrap-container"
          style={{
            backgroundColor: isInside ? '#627DFF' : 'transparent',
          }}
        >
          <Header />
          <div className="contents">
            <Outlet />
          </div>
        </div>
        <Footer />
      </div>
      <DevLogout />
      <DevButton />
    </AuthProvider>
  );
}

export default App;
