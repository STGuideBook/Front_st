import React, { useState } from 'react';
import './Main.css';
import PaginationWithButtons from './PaginationWithButtons';

const MainFirstSection = () => {
  return (
    <div>
      <div className="main-welcome">Welcome To<br />Seoul_Tech!</div>
      <div className="main-school-img">
        <img src="assets/img/main/main-school.png" alt="Main School" />
      </div>
    </div>
  );
};

const MainSecondSection = () => {
  return (
    <div className='main-second-section'>
      <div className='main-popular-info'>많이 찾는 정보</div>
    </div>
  );
};

export default function Main() {
  const [currentPage, setCurrentPage] = useState(1);
  const buttonsPerPage = 5; // 한 페이지에 표시할 버튼 수
  const totalButtons = 15; // 총 버튼 수 (3페이지 * 5버튼)
  const totalPages = Math.ceil(totalButtons / buttonsPerPage); // 총 페이지 수

  // 버튼 내용 배열
  const buttons = [
    { title: '선배가 추천하는 맛집', subtitle: '먹거리 >', image: 'assets/img/main/button-img-1.svg' },
    { title: '기숙사, 어디가 좋을까?', subtitle: '주거 >', image: 'assets/img/main/button-img-2.svg' },
    { title: '수강신청 A부터 Z까지', subtitle: '학업 >', image: 'assets/img/main/button-img-3.svg' },
    { title: '개강파티? 여기로 모여!', subtitle: '먹거리 >', image: 'assets/img/main/button-img-4.svg' },
    { title: '과기대 더 알고싶다면?', subtitle: '팁게시판', image: 'assets/img/main/button-img-5.svg' },
    { title: '버튼 6 제목', subtitle: '버튼 6 부제목', image: null },
    { title: '버튼 7 제목', subtitle: '버튼 7 부제목', image: null },
    { title: '버튼 8 제목', subtitle: '버튼 8 부제목', image: null },
    { title: '버튼 9 제목', subtitle: '버튼 9 부제목', image: null },
    { title: '버튼 10 제목', subtitle: '버튼 10 부제목', image: null },
    { title: '버튼 11 제목', subtitle: '버튼 11 부제목', image: null },
    { title: '버튼 12 제목', subtitle: '버튼 12 부제목', image: null },
    { title: '버튼 13 제목', subtitle: '버튼 13 부제목', image: null },
    { title: '버튼 14 제목', subtitle: '버튼 14 부제목', image: null },
    { title: '버튼 15 제목', subtitle: '버튼 15 부제목', image: null },
  ];

  // 현재 페이지에 따라 보여줄 버튼 리스트 계산
  const currentButtons = buttons.slice((currentPage - 1) * buttonsPerPage, currentPage * buttonsPerPage);

  const handlePageChange = (pageNumber) => {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };

  return (
    <div>
      <MainFirstSection />
      <MainSecondSection />
      <PaginationWithButtons
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
        buttons={currentButtons}
      />
    </div>
  );
}
