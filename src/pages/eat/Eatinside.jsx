import "./Eatinside.css";




const Eatinside = ({title, content, img }) => {
    return (<div className="eat-inside-main">
        <div className="eat-inside-title">
            <h3>먹거리</h3>
            <h1>신가네칼국수</h1>
        </div>
        <div className="eat-inside-back">
            <div className="eat-inside-contents">
                <div className="eat-content-box">
                    <img className="eat-content-image" src="/assets/img/eat/food-image.svg" alt="" />
                    <div className="eat-location">하계  ㅣ  칼국수, 보쌈</div>
                    <div className="eat-star-images">
                        <img src="/assets/img/eat/star.svg" alt="" />
                        <img src="/assets/img/eat/star.svg" alt="" />
                        <img src="/assets/img/eat/star.svg" alt="" />
                        <img src="/assets/img/eat/star.svg" alt="" />
                        <img src="/assets/img/eat/star.svg" alt="" />
                        <span className="eat-star-content">과기인 별점 평균 5.0</span>
                    </div>
                    <div className="eat-content-box-content">서울특별시 노원구 공릉로<br />0507 - 1314 - 9956<br />가족외식, 혼밥<br />서민적인, 자가제면, 아침식사, 점심식사, 저녁식사, 배달</div>
                </div>
                {/* 후기 작성 */}
            </div>
        </div>
    </div>)
};

export default Eatinside;