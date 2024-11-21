import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Foodmain from "../pages/eat/Foodmain";
import Foodopen from "../pages/eat/Foodopen";
import Tipmain from "../pages/tip/Tipmain";
import Food from "../pages/eat/Food";
import Coffeemain from "../pages/eat/Coffeemain"
import Drinkmain from "../pages/eat/Drinkmain"
import Main from "../pages/main/Main"
import Tip from "../pages/tip/Tip";
import TipmainServer from "../pages/tip/TipmainServer";
import Study from "../pages/study/Study";
import Studymain from "../pages/study/Studymain";


export const router = createBrowserRouter([
    {
        path: "",
        element: <App />, // 기본 틀
        children: [
            {
                path: "",
                element: <Main /> // 메인 페이지
            },
            {
                path: "eat",
                element: <Food />, // 먹거리 틀 페이지
                children: [{
                    path: "",
                    element: <Foodopen /> // 먹거리 선택 페이지
                },
                {
                    path: "food",
                    element: <Foodmain /> // 식사 페이지
                },
                {
                    path: "coffee",
                    element: <Coffeemain /> // 카페 페이지
                },
                {
                    path: "drink",
                    element: <Drinkmain /> // 주점 페이지
                }]
            },
            {
                path: "tip",
                element: <Tip />,
                children: [{
                    path: "",
                    element: <TipmainServer/>
                }]
            },
            {
                path: "study",
                element: <Study />,
                children: [{
                    path: "",
                    element: <Studymain />
                }]
            }
        ]
    }
])