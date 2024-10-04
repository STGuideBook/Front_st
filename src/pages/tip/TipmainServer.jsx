import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

function Nav(props) {
    const lis = [];
    for (let i = 0; i < props.topics.length; i++) {
        let t = props.topics[i];
        lis.push(
            <li key={t.id}>
                <p>{t.id}</p>
                <Link
                    id={t.id}
                    to={'/tip/read'}
                    onClick={event => {
                        props.onChangeMode(Number(event.target.id));
                    }}>
                    {t.title}
                </Link>
                <p>{t.date}</p>
            </li>
        );
    }
    return (
        <div>
            <ol>
                {lis}
            </ol>
        </div>
    );
}

function Create(props) {
    const [title, setTitle] = useState('');
    const [body, setBody] = useState('');

    return (
        <div>
            <div>팁게시판</div>
            <input type="text" placeholder="아무튼 검색창임" />
            <form onSubmit={event => {
                event.preventDefault();

                // 제목 또는 내용이 비어있는지 확인
                if (!title.trim() || !body.trim()) {
                    alert("제목과 내용을 모두 입력해 주세요!"); // 사용자에게 알림
                    return; // 제출 중단
                }

                props.onCreate(title, body);
                setTitle('');  // 제목을 비움
                setBody('');   // 내용을 비움
            }}>
                <p><input type="text" name="title" value={title} onChange={event => setTitle(event.target.value)} placeholder="제목" /></p>
                <p><textarea name="body" value={body} onChange={event => setBody(event.target.value)} placeholder="글 내용을 입력해주세요." cols="30" rows="10"></textarea></p>
                <p><input type="submit" value="작성완료" /></p>
            </form>
        </div>
    );
}

const Tipmain = () => {
    const [id, setId] = useState(null);
    const [nextId, setNextId] = useState(4);
    const [topics, setTopics] = useState([]);

    // 데이터 불러오기
    useEffect(() => {
        const fetchTopics = async () => {
            try {
                const response = await axios.get('http://localhost:8080/api/topics'); // GET 요청
                setTopics(response.data);
            } catch (error) {
                console.error("Error fetching topics:", error);
            }
        };

        fetchTopics();
    }, []);

    // 데이터 추가하기
    const handleCreate = async (_title, _body) => {
        const today = new Date();
        const formattedDate = `${today.getFullYear()}.${String(today.getMonth() + 1).padStart(2, '0')}.${String(today.getDate()).padStart(2, '0')}`;

        const newTopic = { title: _title, body: _body, date: formattedDate };

        try {
            const response = await axios.post('http://localhost:8080/api/topics', newTopic); // POST 요청
            setTopics([...topics, response.data]); // 새로 추가된 주제를 topics에 추가
        } catch (error) {
            console.error("Error creating topic:", error);
        }
    };

    return (
        <div>
            <h3>팁게시판</h3>
            <h1>여러분의 팁을 공유해주세요!</h1>
            <Create onCreate={handleCreate} />
            <Nav topics={topics} onChangeMode={(id) => {
                setId(id);
            }} />
        </div>
    );
}

export default Tipmain;
