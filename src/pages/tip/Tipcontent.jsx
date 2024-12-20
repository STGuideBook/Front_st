import React, { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../../AuthContext"; // AuthContext 가져오기
import "./Tipcontent.css";

const axiosInstance = axios.create({
    baseURL: "https://stguidebook-649b3dde2d26.herokuapp.com/tip_board",
    timeout: 5000,
    withCredentials: true, // 세션 쿠키를 포함하도록 설정
});

const Tipcontent = () => {
    const { id } = useParams(); // URL에서 id 가져오기
    const navigate = useNavigate(); // useNavigate 훅 가져오기
    const [contentData, setContentData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { isAuthenticated, userInfo } = useAuth();
    const [ranking, setRanking] = useState([]); // 랭킹 데이터
    const [liked, setLiked] = useState(false); // 좋아요 상태 관리

    useEffect(() => {
        console.log("현재 사용자 인증 상태:", isAuthenticated);
        console.log("현재 사용자 정보:", userInfo);
    }, [isAuthenticated, userInfo]);

    // 게시글 삭제 함수
    const handleDelete = async () => {
        if (!isAuthenticated) {
            alert("로그인이 필요합니다.");
            return;
        }

        const confirmDelete = window.confirm("정말로 이 게시글을 삭제하시겠습니까?");
        if (!confirmDelete) return;

        try {
            await axiosInstance.delete(`/delete/${id}`);
            alert("게시글이 삭제되었습니다.");
            navigate("/tip"); // 삭제 후 /tip으로 이동
        } catch (err) {
            console.error("Error deleting the post:", err);
            alert("게시글 삭제 중 문제가 발생했습니다.");
        }
    };

    useEffect(() => {
        // 현재 게시글 가져오기
        const fetchContent = async () => {
            try {
                const response = await axiosInstance.get(`/list/${id}`);
                setContentData(response.data); // 데이터 저장
                setLiked(response.data.liked || false); // 서버에서 좋아요 상태를 가져와 초기화

                console.log("현재 사용자 username:", userInfo?.username);
                console.log("게시글 작성자 username:", response.data.username);
            } catch (err) {
                console.error("Error fetching content:", err);
                setError("게시글을 불러오는 데 실패했습니다.");
            } finally {
                setLoading(false);
            }
        };

        // 랭킹 데이터 가져오기
        const fetchRanking = async () => {
            try {
                const response = await axiosInstance.get(`/list`);
                const transformedData = response.data.map((item, index) => ({
                    id: index + 1, // 게시물에 고유 인덱스 부여
                    postId: item.postId, // 원래 서버의 게시물 ID
                    subject: item.subject,
                    likeCount: item.likeCount,
                    createDate: item.createDate,
                }));

                const sortedData = transformedData
                    .sort((a, b) => b.likeCount - a.likeCount) // likeCount 내림차순 정렬
                    .slice(0, 3); // 상위 3개 선택
                setRanking(sortedData);
            } catch (err) {
                console.error("Error fetching ranking:", err);
            }
        };

        fetchContent();
        fetchRanking();
    }, [id]);

    const handleLike = async () => {
        if (!isAuthenticated) {
            alert("로그인이 필요합니다.");
            return;
        }

        try {
            await axiosInstance.post(`/like/${id}`);
            setLiked(!liked); // 좋아요 상태 토글
            setContentData((prev) => ({
                ...prev,
                likeCount: prev.likeCount + (liked ? -1 : 1), // 상태에 따라 좋아요 개수 업데이트
            }));
        } catch (err) {
            console.error("Error sending like request:", err);
            alert("좋아요 요청 중 문제가 발생했습니다.");
        }
    };

    // 날짜를 "MM/DD HH:mm" 형식으로 변환하는 함수
    const formatDate = (isoString) => {
        const date = new Date(isoString);

        const month = String(date.getMonth() + 1).padStart(2, "0"); // 월 (0부터 시작)
        const day = String(date.getDate()).padStart(2, "0"); // 일
        const hours = String(date.getHours()).padStart(2, "0"); // 시
        const minutes = String(date.getMinutes()).padStart(2, "0"); // 분

        return `${month}/${day} ${hours}:${minutes}`;
    };

    if (loading) return <p>로딩 중...</p>;
    if (error) return <p>{error}</p>;

    return (
        <div className="tip-content-main">
            <div className="tip-content-title">
                <h1>팁게시판</h1>
            </div>
            <div className="tip-content-back">
                <div className="tip-content-inside">
                    <div className="tip-detail-container">
                        <div className="tip-detail-profile">
                            <img src="/assets/img/tip/user-profile.svg" alt="" />
                        </div>
                        <p className="tip-detail-studentId">익명의 {contentData.student_Id}학번</p>
                        <p className="tip-detail-date">{formatDate(contentData.createDate)}</p>
                        {userInfo && userInfo.username === contentData.username && (
                            <div className="tip-detail-buttons">
                                <div className="tip-edit-button">수정</div>
                                <div>ㅣ</div>
                                <div
                                    className="tip-delete-button"
                                    onClick={handleDelete} // 삭제 버튼 클릭 이벤트 연결
                                >
                                    삭제
                                </div>
                            </div>
                        )}
                        <h2 className="tip-detail-title">{contentData.subject}</h2>
                        <p className="tip-detail-body">{contentData.content}</p>
                        <div
                            className={`tip-detail-heart ${liked ? "liked" : ""}`}
                            onClick={handleLike}
                        >
                            <div>도움됐어요</div>
                            <img
                                src={
                                    liked
                                        ? "/assets/img/tip/heart-red.svg"
                                        : "/assets/img/tip/heart-gray.svg"
                                }
                                alt="heart icon"
                            />
                            <span>{contentData.likeCount}</span>
                        </div>
                    </div>
                    <div className="tip-ranking-menu">
                        <div className="tip-ranking-title">인기글 TOP 3</div>
                        <div className="tip-menu-intro">
                            <div className="tip-intro-id">순위</div>
                            <div className="tip-intro-title">제목</div>
                            <div className="tip-intro-date">등록일</div>
                            <div className="tip-intro-heart"></div>
                        </div>
                        <ol className="tip-list">
                            {ranking.map((item, index) => (
                                <li key={item.id || index} className="tip-list-item">
                                    <p className="tip-item-id">{index + 1}</p>
                                    <Link
                                        to={`/tip/read/${item.id}`}
                                        className="tip-item-title"
                                    >
                                        {item.subject}
                                    </Link>
                                    <p className="tip-item-date">{formatDate(item.createDate)}</p>
                                    <p className="tip-item-heart">{item.likeCount}</p>
                                </li>
                            ))}
                        </ol>
                    </div>

                    <Link to={`/tip`} className="tip-go-list">
                        <div>글 목록으로</div>
                        <img src="/assets/img/tip/goarrow.svg" alt="" />
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Tipcontent;