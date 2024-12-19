import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../../AuthContext"; // AuthContext 가져오기
import "./Tipmain.css";

// Axios 인스턴스 생성
const axiosInstance = axios.create({
  baseURL: "https://stguidebook-649b3dde2d26.herokuapp.com/tip_board",
  timeout: 5000,
  withCredentials: true, // 세션 쿠키를 포함하도록 설정
});

// 페이지 네비게이션 컴포넌트
const Pagination = ({ postsPerPage, totalPosts, currentPage, setCurrentPage }) => {
  const pageNumbers = [];
  const totalPages = Math.ceil(totalPosts / postsPerPage);

  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  if (totalPages <= 1) return null;

  const handleClick = (number) => {
    setCurrentPage(number);
    window.scrollTo(0, 0);
  };

  return (
    <ul className="tip-pagination">
      {pageNumbers.map((number) => (
        <li key={number} className="tip-pagination-item">
          <button
            onClick={() => handleClick(number)}
            className={`tip-pagination-button ${number === currentPage ? "active" : ""}`}
          >
            {number}
          </button>
        </li>
      ))}
    </ul>
  );
};

// 게시글 목록 컴포넌트
const Nav = ({ topics, totalPosts, currentPage, postsPerPage }) => {
  const startIndex = totalPosts - (currentPage - 1) * postsPerPage;

  return (
    <ol className="tip-list">
      {topics.map((t, index) => (
        <li key={t.id} className="tip-list-item">
          <p className="tip-item-id">{startIndex - index}</p>
          <Link to={`/tip/read/${t.id}`} className="tip-item-title">
            {t.title}
          </Link>
          <p className="tip-item-date">{t.date}</p>
          <p className="tip-item-heart">{t.heart}</p>
        </li>
      ))}
    </ol>
  );
};

const Create = ({ onCreate, login, onSearch }) => {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [isWriting, setIsWriting] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const handleToggleWrite = () => {
    if (!login) {
      alert("로그인이 필요합니다.");
      return;
    }
    setIsWriting(!isWriting);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!title.trim() || !body.trim()) {
      alert("제목과 내용을 입력해주세요.");
      return;
    }
    onCreate(title, body);
    setTitle("");
    setBody("");
    setIsWriting(false);
  };

  const handleSearchChange = (event) => {
    const value = event.target.value;
    setSearchTerm(value);
    onSearch(value); // 검색어 변경 시 상위 컴포넌트로 전달
  };

  return (
    <div className="create-wrap">
      <div className="tip-box-up">
        <h3>팁게시판</h3>
        <div className="tip-input-wrap">
          <input
            className="input"
            type="text"
            placeholder="글 제목, 내용"
            value={searchTerm}
            onChange={handleSearchChange}
          />
          <img src="assets/img/tip/search.svg" alt="검색" />
        </div>
      </div>
      <div
        className={`tip-writeBtn ${login ? "active" : "disabled"}`}
        onClick={handleToggleWrite}
      >
        <div>
          {login
            ? "새 글 작성하기"
            : "글 작성을 위해 로그인이 필요합니다."}
        </div>
        <img
          src={
            login
              ? "assets/img/tip/pencil.svg"
              : "assets/img/tip/locked.svg"
          }
          alt={login ? "연필 이미지" : "잠긴 이미지"}
        />
      </div>
      {login && (
        <div className={`tip-box ${isWriting ? "open" : ""}`}>
          <form onSubmit={handleSubmit}>
            <input
              className="input tip-title"
              type="text"
              name="title"
              value={title}
              placeholder="제목"
              onChange={(event) => setTitle(event.target.value)}
            />
            <hr />
            <textarea
              className="input tip-body"
              name="body"
              value={body}
              onChange={(event) => setBody(event.target.value)}
              placeholder="글 내용을 입력해주세요."
              cols="30"
              rows="10"
            ></textarea>
            <input className="input tip-submit" type="submit" value="" />
          </form>
        </div>
      )}
    </div>
  );
};

const Tipmain = () => {
  const { isAuthenticated } = useAuth();
  const [topics, setTopics] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 5;
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [sortOrder, setSortOrder] = useState("date");
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchTopics = async () => {
      setLoading(true);
      try {
        const response = await axiosInstance.get("/list");
        if (response.data && response.data.length > 0) {
          const transformedTopics = response.data.map((item, index) => {
            const createDate = new Date(item.createDate);
            const isValidDate = !isNaN(createDate.getTime());
            return {
              id: index + 1,
              title: item.subject,
              body: item.content,
              date: isValidDate
                ? createDate.toISOString().split("T")[0]
                : "날짜 없음",
              heart: item.likeCount || 0,
            };
          });
          setTopics(transformedTopics);
        } else {
          setTopics([]);
        }
      } catch (err) {
        setError("게시글을 불러오는 데 실패했습니다.");
      } finally {
        setLoading(false);
      }
    };
    fetchTopics();
  }, []);

  const handleSearch = (term) => {
    setSearchTerm(term);
  };

  const filteredTopics = topics.filter(
    (topic) =>
      topic.title?.includes(searchTerm) || topic.body?.includes(searchTerm)
  );

  const sortedTopics =
    sortOrder === "date"
      ? [...filteredTopics].reverse()
      : [...filteredTopics].sort((a, b) => b.heart - a.heart);

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = sortedTopics.slice(indexOfFirstPost, indexOfLastPost);

  const handleCreate = async (_subject, _content) => {
    try {
      const response = await axiosInstance.post("/create", {
        subject: _subject,
        content: _content,
      });
      const createDate = new Date(response.data.createDate);
      const isValidDate = !isNaN(createDate.getTime());
      const newTopic = {
        id: topics.length + 1,
        title: response.data.subject,
        body: response.data.content,
        date: isValidDate
          ? createDate.toISOString().split("T")[0]
          : "날짜 없음",
        heart: response.data.likeCount || 0,
      };
      setTopics((prevTopics) => [newTopic, ...prevTopics]);
      window.location.reload();
    } catch (err) {
      setError("게시글을 추가하는 데 실패했습니다.");
    }
  };

  if (loading) return <p>로딩 중...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="main">
      <h3>팁게시판</h3>
      <h1>여러분의 팁을 공유해주세요!</h1>
      <Create onCreate={handleCreate} login={isAuthenticated} onSearch={handleSearch} />
      <div className="tip-menu-select">
        <div
          className={`menu-date-select ${sortOrder === "date" ? "active" : ""}`}
          onClick={() => setSortOrder("date")}
        >
          최신순
        </div>
        <div
          className={`menu-heart-select ${sortOrder === "heart" ? "active" : ""}`}
          onClick={() => setSortOrder("heart")}
        >
          하트순
        </div>
      </div>
      <div className="tip-menu-intro">
        <div className="tip-intro-id">번호</div>
        <div className="tip-intro-title">제목</div>
        <div className="tip-intro-date">등록일</div>
        <div className="tip-intro-heart"></div>
      </div>
      <Nav
        topics={currentPosts}
        totalPosts={sortedTopics.length}
        currentPage={currentPage}
        postsPerPage={postsPerPage}
      />
      <Pagination
        postsPerPage={postsPerPage}
        totalPosts={sortedTopics.length}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />
    </div>
  );
};

export default Tipmain;