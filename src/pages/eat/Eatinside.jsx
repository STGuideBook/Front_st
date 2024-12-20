import React, { useState } from "react";
import { useAuth } from "../../AuthContext"; // AuthContext 가져오기
import "./Eatinside.css";

const Eatinside = ({ title, content, img }) => {
  const { isAuthenticated } = useAuth(); // 로그인 상태 가져오기
  const [isWriting, setIsWriting] = useState(isAuthenticated); // 로그인 상태면 바로 작성칸 표시
  const [rating, setRating] = useState(0); // 별점 상태 관리

  const handleToggleWrite = () => {
    if (!isAuthenticated) {
      alert("로그인이 필요합니다.");
      return;
    }
    setIsWriting(true); // 로그인 상태면 작성칸 표시
  };

  const handleRatingClick = (star) => {
    setRating(star); // 클릭된 별점 설정
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (rating === 0) {
      alert("별점을 선택해주세요.");
      return;
    }
    alert(`후기: 제출됨\n별점: ${rating}`);
    // 서버로 후기와 별점 정보를 전송하는 로직을 추가하세요.
  };

  return (
    <div className="eat-inside-main">
      <div className="eat-inside-title">
        <h3>먹거리</h3>
        <h1>{title || "신가네칼국수"}</h1>
      </div>
      <div className="eat-inside-back">
        <div className="eat-inside-contents">
          <div className="eat-content-box">
            <img
              className="eat-content-image"
              src={img || "/assets/img/eat/food-image.svg"}
              alt=""
            />
            <div className="eat-location">
              하계 ㅣ 칼국수, 보쌈
            </div>
            <div className="eat-star-images">
              <img src="/assets/img/eat/star-filled.svg" alt="별점" />
              <img src="/assets/img/eat/star-filled.svg" alt="별점" />
              <img src="/assets/img/eat/star-filled.svg" alt="별점" />
              <img src="/assets/img/eat/star-filled.svg" alt="별점" />
              <img src="/assets/img/eat/star.svg" alt="별점" />
              <span className="eat-star-content">
                과기인 별점 평균 4.0
              </span>
            </div>
            <div className="eat-content-box-content">
              서울특별시 노원구 공릉로<br />
              0507 - 1314 - 9956<br />
              가족외식, 혼밥<br />
              서민적인, 자가제면, 아침식사, 점심식사, 저녁식사, 배달
            </div>
          </div>
          {/* 후기 작성 */}
          {!isAuthenticated ? (
            <div
              className={`eat-writeBtn ${isAuthenticated ? "active" : "disabled"}`} // 로그인 여부에 따라 클래스 변경
              onClick={handleToggleWrite}
            >
              <div>후기 작성을 위해 로그인이 필요합니다.</div>
              <img
                src="/assets/img/tip/locked.svg"
                alt="잠긴 이미지"
              />
            </div>
          ) : (
            <div className="eat-review-form">
              <form onSubmit={handleSubmit}>
                <input
                  type="text"
                  className="input review-body"
                  placeholder="수정이 불가하니 신중한 작성 부탁드립니다."
                />
                <div className="star-rating">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <img
                      key={star}
                      src={
                        rating >= star
                          ? "/assets/img/eat/star-filled.svg" // 클릭된 별 이미지
                          : "/assets/img/eat/star.svg" // 기본 별 이미지
                      }
                      alt={`${star}점`}
                      onClick={() => handleRatingClick(star)}
                      style={{ cursor: "pointer" }}
                    />
                  ))}
                </div>
                <button type="submit" className="submit-review-button">
                  <img src="/assets/img/tip/pencil.svg" alt="제출" />
                </button>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Eatinside;
