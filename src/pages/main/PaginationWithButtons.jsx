import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './PaginationWithButtons.css';

const PaginationWithButtons = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = 3;
  const buttonsPerPage = 5;

  // 버튼 색상 배열
  const buttonColors = ['#96A8FE', '#7E94FF', '#6562FF', '#96A8FE', '#1A1869'];

  // 버튼 데이터 배열
  const buttonData = [
    { title: '선배가 추천하는 맛집', subtitle: '먹거리 >', img: 'assets/img/main/button-img-1.svg', link: '/eat' },
    { title: '기숙사, 어디가 좋을까?', subtitle: '주거 >', img: 'assets/img/main/button-img-2.svg', link: '/living' },
    { title: '수강신청 A부터 Z까지', subtitle: '학업 >', img: 'assets/img/main/button-img-3.svg', link: '/study' },
    { title: '개강파티? 여기로 모여!', subtitle: '먹거리 >', img: 'assets/img/main/button-img-4.svg', link: '/eat' },
    { title: '과기대 더 알고싶다면?', subtitle: '팁 게시판 >', img: 'assets/img/main/button-img-5.svg', link: '/tip' },
    { title: '학생증 100% 활용하기>', subtitle: '팁 게시판 >', link: '/tip' },
    { title: '시험공부 효율적으로 하는 법', subtitle: '팁 게시판 >', link: '/tip' },
    { title: '나랑 Library 갈래?', subtitle: '팁 게시판 >', link: '/tip' },
    { title: '너만의 꿀팁을 알려줘!', subtitle: '팁 게시판 >', link: '/tip' },
    { title: '과기대 더 알고 싶다면?', subtitle: '팁 게시판 >', link: '/tip' },
    { title: 'Tools Experts', subtitle: '화이팅 >', link: '/page11' },
    { title: '자랑스러운 컴퓨터공학과', subtitle: '최고다 >', link: '/page12' },
    { title: '우리의 상상이 미래를 만든다', subtitle: '미래관 >', link: '/page13' },
    { title: '조국과 인류의 미래에', subtitle: '두둥탁 >', link: '/page14' },
    { title: '기여하는 세계 속의 대학', subtitle: '서울과기대 >', link: '/page15' },
  ];

  const handleClick = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const renderButtons = () => {
    const buttons = [];
    const startIndex = (currentPage - 1) * buttonsPerPage;
    const endIndex = startIndex + buttonsPerPage;

    for (let i = startIndex; i < endIndex; i++) {
      const buttonIndex = i % buttonData.length;
      const { title, subtitle, img, link } = buttonData[buttonIndex];
      const color = buttonColors[buttonIndex % buttonColors.length];
      buttons.push( 
        <Link key={i} to={link} style={{ textDecoration: 'none' }} onClick={()=> {window.scrollTo(0, 0);}}>  {/* Link로 감싸서 페이지 이동 */}
          <div className="main-button-item" style={{ backgroundColor: color }}>
            <h3>{title}</h3>
            <p>{subtitle}</p>
            <img src={img} />
          </div>
        </Link>
      );
    }
    return buttons;
  };

  return (
    <div className="main-pagination-container">
      <div className="main-button-container">
        {renderButtons()}
      </div>
      <div className="main-pagination-buttons">
        <button
          onClick={() => handleClick(currentPage - 1)}
          disabled={currentPage === 1}
        >
          &lt;
        </button>
        {[...Array(totalPages)].map((_, index) => (
          <button
            key={index}
            onClick={() => handleClick(index + 1)}
            className={`main-page-button ${currentPage === index + 1 ? 'main-active' : ''}`}
          >
            {index + 1}
          </button>
        ))}
        <button
          onClick={() => handleClick(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          &gt;
        </button>
      </div>
    </div>
  );
};

export default PaginationWithButtons;
