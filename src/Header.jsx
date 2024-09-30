import './Header.css';
import { Link } from "react-router-dom";

const Header = () => {
    return <div className='header'>
    <nav>
    <div class="nav-bar">
            <div class="nav-btns">
                <Link to={"/eat"}>먹거리</Link>
                <a>학업</a>
                <a>주거</a>
                <a>팁게시판</a>
            </div>
            <div class="nav-logo">
                <a href="/"><img src='assets/img/seoultech-logo.png'/></a>
            </div>
            <div class="nav-login">
                <a>로그인</a>
                <img class="login-icon" src="assets/img/login-person.png"/>
            </div>
        </div>
    </nav>
  </div>

}

export default Header;