import "./Itemmain.css";
import { useNavigate } from "react-router-dom";

export default function Itemmain({ title, img }) {
    const nav = useNavigate();
    const handleClick = () => {
        nav("/eat/content");
    }
    return (
        <div className="Itemmain">
            <img src={img} alt={title} className="item-image" onClick={handleClick}/>
            <h3 className="item-title" onClick={handleClick}>{title}</h3>
        </div>
    );
}
