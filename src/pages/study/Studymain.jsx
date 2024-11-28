import "./Studymain.css"
import Box from "./components/Box";

const Studymain = () => {
    const itemlist = [{
        title: "수강신청",
        content: "수강신청이란?<br/>수업 고르는 법 / 시간표 짜는법<br/>수강신청 하는법",
        img: "assets/img/study/sugang.svg", 
        to: "/study/sugang"
      },{
        title: "공부하기 좋은 장소",
        content: "교내 공부하기 좋은 장소<br/>교외 공부하기 좋은 장소",
        img: "assets/img/study/books.svg", 
        to: "/eat"
      },{
        title: "필수 전공/교양 과목",
        content: "필수전공/필수교양 과목이란?<br/>필수교양 확인하는 법",
        img: "assets/img/study/exclamation.svg", 
        to: "/eat"
      },{
        title: "재수강 제도",
        content: "아쉬운 학점을 올릴 기회",
        img: "assets/img/study/retry.svg",
        to: "/eat"
      },{
        title: "복수전공/부전공",
        content: "복수전공/부전공 제도란?<br/>신청하는 법",
        img: "assets/img/study/bothmajor.svg",
        to: "/eat"
      },{
        title: "졸업 요건",
        content: "졸업요건이란?<br/>졸업요건 확인하는 법",
        img: "assets/img/study/graduate.svg",
        to: "/eat"
      }]

    return <div className="study-main">
        <section className="study-firstsection"> {/* 첫번째 섹션 */}
        <h3>학업</h3>
        <h1>스마트한 학업을 위한 공간</h1>
        <p>수강신청부터 교양, 전공까지! <br />
새내기와 재학생에게 필요한 정보만 모았어요. <br />
선배들의 고학점 꿀팁도 확인해보세요!
        </p>
        {/* pagination 컴포넌트 */}
        </section>
        <section className="study-secondsection">
            <ul className="study-categories"> 
                {itemlist.map((data,index) => (
                    <Box {...data} key={index} /> // ...은 모든 데이터를 다 준다는 뜻
                ))}
            </ul>
        </section>
    </div>
}

export default Studymain;