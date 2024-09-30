import { useState } from 'react';
import './Foodmain.css'

const Foodmain = () => {
    const [activeIndex, setActiveIndex] = useState(0);

    return <div className="main">
        <h3>먹거리 {'>'} 식사</h3>
        <h1>과기대 맛집 총정리</h1>
        <ul className='nav-food-bar'>
            <li><a href="">전체</a></li>
            <li><a href="">1인</a></li>
            <li><a href="">2인</a></li>
            <li><a href="">3~4인 이상</a></li>
        </ul>
            
        <div>

        </div>
    </div>
}

export default Foodmain;