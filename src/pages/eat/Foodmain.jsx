import './Foodmain.css'
import Itemmain from './components/Itemmain';

const Foodmain = () => {

    return <div className="main">
        <h3>먹거리 {'>'} 식사</h3>
        <h1>과기대 맛집 총정리</h1>
        <ul className='nav-food-bar'>
            <li><a href="">전체</a></li>
            <li><a href="">1인</a></li>
            <li><a href="">2인</a></li>
            <li><a href="">3~4인 이상</a></li>
        </ul>
        <Itemmain title="안녕하세요" img="#"></Itemmain>
    </div>
}

export default Foodmain;