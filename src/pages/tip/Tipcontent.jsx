import React, { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../../AuthContext";
import "./Tipcontent.css";

const axiosInstance = axios.create({
    baseURL: "https://stguidebook-649b3dde2d26.herokuapp.com/tip_board",
    timeout: 5000,
    withCredentials: true,
});

const Tipcontent = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [contentData, setContentData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { isAuthenticated, userInfo } = useAuth();
    const [liked, setLiked] = useState(false);
    const [ranking, setRanking] = useState([]);
    const [isEditing, setIsEditing] = useState(false);
    const [editTitle, setEditTitle] = useState("");
    const [editBody, setEditBody] = useState("");

    useEffect(() => {
        const fetchContent = async () => {
            try {
                const response = await axiosInstance.get(`/list/${id}`);
                setContentData(response.data);
                setLiked(response.data.liked || false);
            } catch (err) {
                console.error("Error fetching content:", err);
                setError("게시글을 불러오는 데 실패했습니다.");
            } finally {
                setLoading(false);
            }
        };

        const fetchRanking = async () => {
            try {
                const response = await axiosInstance.get(`/list`);
                const transformedData = response.data.map((item, index) => ({
                    id: index + 1,
                    postId: item.postId,
                    subject: item.subject,
                    likeCount: item.likeCount,
                    createDate: item.createDate,
                }));
                const sortedData = transformedData
                    .sort((a, b) => b.likeCount - a.likeCount)
                    .slice(0, 3);
                setRanking(sortedData);
            } catch (err) {
                console.error("Error fetching ranking:", err);
            }
        };

        fetchContent();
        fetchRanking();
    }, [id]);

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
            navigate("/tip");
        } catch (err) {
            console.error("Error deleting the post:", err);
            alert("게시글 삭제 중 문제가 발생했습니다.");
        }
    };

    const handleLike = async () => {
        if (!isAuthenticated) {
            alert("로그인이 필요합니다.");
            return;
        }

        try {
            await axiosInstance.post(`/like/${id}`);
            setLiked(!liked);
            setContentData((prev) => ({
                ...prev,
                likeCount: prev.likeCount + (liked ? -1 : 1),
            }));
        } catch (err) {
            console.error("Error sending like request:", err);
            alert("좋아요 요청 중 문제가 발생했습니다.");
        }
    };

    const handleEdit = () => {
        setIsEditing(true);
        setEditTitle(contentData.subject);
        setEditBody(contentData.content);
    };

    const handleCancelEdit = () => {
        setIsEditing(false);
    };

    const handleSubmitEdit = async (event) => {
        event.preventDefault();
        if (!isAuthenticated) {
            alert("로그인이 필요합니다.");
            return;
        }

        try {
            await axiosInstance.put(`/update/${id}`, {
                subject: editTitle,
                content: editBody,
            });
            alert("게시글이 수정되었습니다.");
            setContentData((prev) => ({
                ...prev,
                subject: editTitle,
                content: editBody,
            }));
            setIsEditing(false);
        } catch (err) {
            console.error("Error updating post:", err);
            alert("게시글 수정 중 문제가 발생했습니다.");
        }
    };

    const formatDate = (isoString) => {
        const date = new Date(isoString);
        const month = String(date.getMonth() + 1).padStart(2, "0");
        const day = String(date.getDate()).padStart(2, "0");
        const hours = String(date.getHours()).padStart(2, "0");
        const minutes = String(date.getMinutes()).padStart(2, "0");
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
                        {/* 공통으로 유지되는 요소 */}
                        <div className="tip-detail-profile">
                            <img src="/assets/img/tip/user-profile.svg" alt="" />
                        </div>
                        <p className="tip-detail-studentId">익명의 {contentData.student_Id}학번</p>
                        <p className="tip-detail-date">{formatDate(contentData.createDate)}</p>

                        {isEditing ? (
                            <form className="tip-edit-form" onSubmit={handleSubmitEdit}>
                                <input
                                    className="input tip-title"
                                    type="text"
                                    value={editTitle}
                                    onChange={(e) => setEditTitle(e.target.value)}
                                />
                                <hr />
                                <textarea
                                    className="input tip-body"
                                    value={editBody}
                                    onChange={(e) => setEditBody(e.target.value)}
                                    cols="30"
                                    rows="10"
                                ></textarea>
                                <div className="tip-edit-buttons">
                                    <button type="submit" className="tip-submit-button">
                                        수정하기
                                    </button>
                                    <button
                                        type="button"
                                        className="tip-cancel-button"
                                        onClick={handleCancelEdit}
                                    >
                                        취소
                                    </button>
                                </div>
                            </form>
                        ) : (
                            <>
                                {userInfo && userInfo.username === contentData.username && (
                                    <div className="tip-detail-buttons">
                                        <div
                                            className="tip-edit-button"
                                            onClick={handleEdit}
                                        >
                                            수정
                                        </div>
                                        <div>ㅣ</div>
                                        <div
                                            className="tip-delete-button"
                                            onClick={handleDelete}
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
                            </>
                        )}
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
                                        onClick={()=>{
                                            setTimeout(() => {
                                                window.location.reload();
                                            }, 200);
                                        }}
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