import "./Itemmain.css";

export default function Itemmain({title, img}) {
    return <div className="Itemmain">
        <div className="img-box">
            <img src={img} alt={title} />
        </div>
        <h3>{title}</h3>
    </div>
}