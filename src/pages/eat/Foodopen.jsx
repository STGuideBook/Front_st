import './Foodopen.css'
import Item from './components/Item';

const Foodopen = ()=>{
    const itemlist = [{
      title: "식사",
      img: "assets/img/eat/food.png", 
      to: "/eat/food"
    },{
      title: "카페/디저트",
      img: "assets/img/eat/coffee.png", 
      to: "/eat/coffee"
    },{
      title: "주류",
      img: "assets/img/eat/drink.png", 
      to: "/eat/drink"
    }]
  
    return <div className="main">
      <h3>먹거리</h3>
      <h1>어떤 곳을 찾으세요?</h1>
      <ul className="categories"> 
        {itemlist.map((data,index) => (
          <Item {...data} key={index} /> // ...은 모든 데이터를 다 준다는 뜻
        ))}
      </ul>
    </div>
  }

  export default Foodopen;