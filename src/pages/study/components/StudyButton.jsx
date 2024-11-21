import "./StudyButton.css";
import { useNavigate } from "react-router-dom";

export default function StudyButton({ to }) { // 구조분해 할당으로 to를 props에서 가져옴
    const nav = useNavigate();
    return (
        <div
            className="study-button"
            onClick={() => {
                setTimeout(() => {
                    nav(to); // to를 사용하여 페이지 이동
                }, 0);
            }}
        >
            확인하기
        </div>
    );
}
