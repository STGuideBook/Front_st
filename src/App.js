import React from 'react';
import './App.css';
import Header from './Header';
import Footer from './Footer';
import { Outlet, useMatch } from 'react-router-dom';
import { AuthProvider } from './AuthContext';

function App() {
  // useMatch를 조건문 밖에서 호출
  const matchStudySugang = useMatch('/study/sugang');
  const matchEatContent = useMatch('/eat/content');
  const matchTipRead = useMatch('/tip/read/:id');

  // 조건부로 값 설정
  const isInside = matchStudySugang || matchEatContent || matchTipRead;

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
    </AuthProvider>
  );
}

export default App;