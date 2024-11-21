import React, { useState } from "react";
import "./Item.css";
import { useNavigate } from "react-router-dom";

export default function Item({ title, img, to }) {
  const [isAllValid, setIsAllValid] = useState(false);
  const nav = useNavigate();

  const handleClick = (event) => {
    event.preventDefault();
    setIsAllValid(true); // 클릭 시 애니메이션 시작
    setTimeout(() => {
      setIsAllValid(false); // 1초 후 애니메이션 클래스 제거
      nav(to);
      console.log(to);
    }, 800); // 애니메이션 시간에 맞춰 1초로 설정
  };

  return (
    <li className={`category button button-effect-a button-effect-b ${isAllValid ? "button-click" : ""} ${isAllValid ? "indexdown" : ""}`}>
        <div className={`img-container`}>
          <img src={img} alt={title} onClick={handleClick}/>
        </div>
        <p className="button_text" onClick={handleClick}>{title}</p> {/* 버튼 텍스트 추가 */}
    </li>
  );
}
