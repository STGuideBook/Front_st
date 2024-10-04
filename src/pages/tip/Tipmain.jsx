// Tipmain.js
import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Tipmain.css";

// 페이지 네비게이션 컴포넌트
const Pagination = ({ postsPerPage, totalPosts, currentPage, setCurrentPage }) => {
  const pageNumbers = [];

  const totalPages = Math.ceil(totalPosts / postsPerPage);
  
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  if (totalPages <= 1) return null; // 페이지가 1개 이하이면 네비게이션 숨김

  const handleClick = (number) => {
    setCurrentPage(number);
    window.scrollTo(0, 0); // 페이지 이동 시 스크롤을 상단으로 이동
  };

  return (
    <div>
      <ul className="pagination">
        {pageNumbers.map(number => (
          <li key={number} className="pagination-item">
            <button
              onClick={() => {handleClick(number)}}
              className={`pagination-button ${number === currentPage ? 'active' : ''}`}
            >
              {number}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

// 게시글 목록 컴포넌트
const Nav = ({ topics, onChangeMode }) => {
  return (
    <div>
      <ol className="tip-list">
        {topics.map(t => (
          <li key={t.id} className="tip-list-item">
            <p className="tip-item-id">{t.id}</p>
            <Link
              id={t.id}
              to={'/tip/read'}
              className="tip-item-title"
              onClick={event => {
                onChangeMode(Number(event.target.id));
              }}
            >
              {t.title}
            </Link>
            <p className="tip-item-date">{t.date}</p>
            <p className="tip-item-heart">{t.heart}</p>
          </li>
        ))}
      </ol>
    </div>
  );
};

// 게시글 생성 컴포넌트
const Create = ({ onCreate }) => {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');

  return (
    <div className="create-wrap">
      <div className="tip-box-up">
        <h3>팁게시판</h3>
        <div className="input-wrap">
          <input className="input" type="text" placeholder="글 제목, 내용" />
          <img src="assets/img/tip/search.svg" alt="검색" />
        </div>
      </div>
      <div className="tip-box">
        <form onSubmit={event => {
          event.preventDefault();
          if (!title.trim() || !body.trim()) {
            return; // 제출 중단
          }
          onCreate(title, body);
          setTitle('');  // 제목을 비움
          setBody('');   // 내용을 비움
        }}>
          <input
            className="input tip-title"
            type="text"
            name="title"
            value={title}
            placeholder="제목"
            onChange={event => setTitle(event.target.value)}
          />
          <hr />
          <textarea
            className="input tip-body"
            name="body"
            value={body}
            onChange={event => setBody(event.target.value)}
            placeholder="글 내용을 입력해주세요."
            cols="30"
            rows="10"
          ></textarea>
          <input className="input tip-submit" type="submit" value="" />
        </form>
      </div>
    </div>
  );
};

// 메인 게시판 컴포넌트
const Tipmain = () => {
  const [id, setId] = useState(null);
  const [nextId, setNextId] = useState(4);
  const [topics, setTopics] = useState([
    { id: 3, title: '공릉역 가는 버스 노선/시간표 총정리', body: 'html is ...', date: '2024.08.13', heart: '8' },
    { id: 2, title: '카공하기 좋은 카페', body: 'css is ...', date: '2024.08.01', heart: '3' },
    { id: 1, title: '자취방 구할 때 팁 / 자취생 꿀팁 다 알려드림', body: 'javascript is ...', date: '2024.07.28', heart: '13' }
  ]);

  const [heartN,setHeart] = useState(0);

  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 5;

  const today = new Date();
  const formattedDate = `${today.getFullYear()}.${String(today.getMonth() + 1).padStart(2, '0')}.${String(today.getDate()).padStart(2, '0')}`;

  // 게시글 추가 함수
  const handleCreate = (_title, _body) => {
    const newTopic = { id: nextId, title: _title, body: _body, date: formattedDate, heart: heartN};
    const newSetTopic = [newTopic, ...topics];
    setTopics(newSetTopic);
    setId(nextId);
    setNextId(nextId + 1);
    setHeart(0);
    setCurrentPage(1); // 새 게시글 추가 시 첫 페이지로 이동
  };

  // 현재 페이지에 표시할 게시글 계산
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = topics.slice(indexOfFirstPost, indexOfLastPost);

  return (
    <div className="main">
      <h3>팁게시판</h3>
      <h1>여러분의 팁을 공유해주세요!</h1>
      <Create onCreate={handleCreate} />
      <div className="tip-menu-select">
        <div className="menu-date-select">최신순</div>
        <div className="menu-heart-select">하트순</div>
      </div>
      <div className="tip-menu-intro">
        <div className="tip-intro-id">번호</div>
        <div className="tip-intro-title">제목</div>
        <div className="tip-intro-date">등록일</div>
        <div className="tip-intro-heart"/>
      </div>
      <Nav
        topics={currentPosts}
        onChangeMode={(id) => setId(id)}
      />
      <Pagination
        postsPerPage={postsPerPage}
        totalPosts={topics.length}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />
    </div>
  );
}

export default Tipmain;
