import Button from "./StudyButton";
import React from "react";
import "./Box.css";

export default function Box({ title, content, img, to }) {
    console.log(to);
    return (
        <div className="study-box">
            <div className="study-box-title">
                {title}
            </div>
            <div className="study-box-content">
                {content.split("<br/>").map((line, index) => (
                    <React.Fragment key={index}>
                        {line}
                        <br />
                    </React.Fragment>
                ))}
            </div>
            <div className="study-box-img">
                <img src={img} alt="" />
            </div>
            <div className="study-box-button">
                <Button to={to} ></Button>
            </div>
        </div>
    );
}
