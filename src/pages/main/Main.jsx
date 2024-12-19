import React from 'react';
import './Main.css';
import PaginationWithButtons from './PaginationWithButtons';

const MainFirstSection = () => {
  return (
    <div className='main-first-section'>
      <div className="main-welcome">Welcome To<br />Seoul_Tech!</div>
      <div className="main-school-img">
        <img src="assets/img/main/main-school.png"/>
      </div>
    </div>
  );
};

const MainSecondSection = () => {
  return (
    <div className='main-second-section'>
      <div className='main-popular-info'>많이 찾는 정보</div>
    </div>
  );
};

const MainThridSection = () => {
  return (
    <div className='main-thrid-section'>
      <div>
        <div className='main-for-who'>For Who?</div>
        <div className="main-for-who-p">
          서울과학기술대학교 신입생 여러분, 환영합니다!<br />
          저희 웹사이트는 여러분이 대학 생활을 시작하면서 겪을 수 있는 어려움을<br />
          덜어드리기 위해 제작되었습니다. 신입생 시절, 정보를 어디서 얻어야 할지<br />
          몰라 답답했던 경험을 바탕으로 여러분이 대학 생활에 필요한 모든 정보를<br />
          쉽게 찾고 활용할 수 있도록 도와드릴게요.
        </div>
      </div>
      <img src="assets/img/main/for-who.svg"/>
    </div>
  );
};

const MainFourthSection = () => {
  return (
    <div className='main-fourth-section'>
      <img src="assets/img/main/warning.png"/>
      <div className='main-caution'>Caution</div>
      <div className='main-caution-p'>저희 웹사이트는 대학생활에 필요한 정확하고 유익한 정보를 제공하는 것을 최우선 목표로<br/>
하고 있습니다. 따라서 모든 정보는 신중하게 검토되며, 잘못된 정보가 포함되지 않도록 최선을<br/>
다하고 있습니다. 그러나, 제공된 정보가 시간이 지나면서 변동될 수 있으므로 최신 정보를 확인하는<br/>
것은 이용자의 책임입니다. 사이트 내의 모든 정보는 참고용으로 봐주시면 감사하겠습니다.</div>
    </div>
  );
};

const Main = () => {
  return (
    <div>
      <div className='main-first'>
        <MainFirstSection />
        <div className='main-second'>
          <div className='main-second-up'>
            <MainSecondSection />
          </div>
          <PaginationWithButtons />
          <MainThridSection />
          <div className='main-third'>
            <MainFourthSection />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Main;
