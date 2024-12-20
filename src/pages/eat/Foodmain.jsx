import { useState } from "react";
import "./Foodmain.css";
import Itemmain from "./components/Itemmain";

const Foodmain = () => {
    // 샘플 데이터 리스트
    const foodList = [
        { id: 1, title: "신가네칼국수", img: "/assets/img/eat/empty.svg" },
        { id: 2, title: "가게명", img: "/assets/img/eat/empty.svg" },
        { id: 3, title: "가게명", img: "/assets/img/eat/empty.svg" },
        { id: 4, title: "가게명", img: "/assets/img/eat/empty.svg" },
        { id: 5, title: "가게명", img: "/assets/img/eat/empty.svg" },
        { id: 6, title: "가게명", img: "/assets/img/eat/empty.svg" },
        { id: 7, title: "가게명", img: "/assets/img/eat/empty.svg" },
        { id: 8, title: "가게명", img: "/assets/img/eat/empty.svg" },
        { id: 9, title: "가게명", img: "/assets/img/eat/empty.svg" },
        { id: 10, title: "가게명", img: "/assets/img/eat/empty.svg" },
        { id: 11, title: "가게명", img: "/assets/img/eat/empty.svg" },
        { id: 12, title: "가게명", img: "/assets/img/eat/empty.svg" },
        { id: 13, title: "가게명", img: "/assets/img/eat/empty.svg" },
        { id: 14, title: "가게명", img: "/assets/img/eat/empty.svg" },
        { id: 15, title: "가게명", img: "/assets/img/eat/empty.svg" },
    ];

    // 상태 관리
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10; // 한 페이지에 표시할 항목 수

    // 페이지네이션 계산
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = foodList.slice(indexOfFirstItem, indexOfLastItem);

    const totalPages = Math.ceil(foodList.length / itemsPerPage);

    return (
        <div className="main">
            <h3>먹거리 {'>'} 식사</h3>
            <h1>식사하기 좋은 곳</h1>
            <ul className="nav-food-bar">
                <li className="active">전체</li>
                <li>1인</li>
                <li>2인</li>
                <li>3인 이상</li>
            </ul>

            {/* 아이템 목록 */}
            <div className="item-list">
                {currentItems.map((item) => (
                    <Itemmain key={item.id} title={item.title} img={item.img} />
                ))}
            </div>

            {/* 페이지네이션 */}
            <div className="pagination">
                {Array.from({ length: totalPages }, (_, index) => (
                    <button
                        key={index + 1}
                        onClick={() => setCurrentPage(index + 1)}
                        className={currentPage === index + 1 ? "active" : ""}
                    >
                        {index + 1}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default Foodmain;
