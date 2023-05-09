import React, { useRef, useEffect, useState } from "react";
import "./App.css";
// 1
import SockJs from "sockjs-client";
import sockLogo from "./images/sockjs.png";

function App() {
    const sockJs = useRef(null);
    const messagesEndRef = useRef(null);
    const [userId, setUserId] = useState("");
    const [isLogin, setIsLogin] = useState(false);
    const [msg, setMsg] = useState("");
    const [msgList, setMsgList] = useState([]);
    useEffect(() => {
        // 2
        sockJs.current = new SockJs("http://0.0.0.0:9999/sock");
    }, []);
    // 3
    useEffect(() => {
        if (!sockJs.current) return;
        sockJs.current.onopen = function () {
            console.log("open", sockJs.current.protocol);
        };
        sockJs.current.onmessage = function (e) {
            const { data, id } = JSON.parse(e.data);
            setMsgList((prev) => [
                ...prev,
                { msg: data, type: "other", id: id },
            ]);
        };
        sockJs.current.onclose = function () {
            console.log("close");
        };
    }, []);
    // 4
    useEffect(() => {
        scrollToBottom();
    }, [msgList]);
    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    // 5
    const onSubmitHandler = (e) => {
        e.preventDefault();
        const sendData = {
            type: "id",
            data: userId,
        };
        sockJs.current.send(JSON.stringify(sendData));
        setIsLogin(true);
    };
    // 6
    const onChangeUserIdHandler = (e) => {
        setUserId(e.target.value);
    };
    // 7
    const onSendSubmitHandler = (e) => {
        e.preventDefault();
        const sendData = {
            type: "msg",
            data: msg,
            id: userId,
        };
        sockJs.current.send(JSON.stringify(sendData));
        setMsgList((prev) => [...prev, { msg: msg, type: "me", id: userId }]);
        setMsg("");
    };
    // 8
    const onChangeMsgHandler = (e) => {
        setMsg(e.target.value);
    };
    return (
        <div className="app-container">
            <div className="wrap">
                {isLogin ? (
                    // 9
                    <div className="chat-box">
                        <h3>Login as a "{userId}"</h3>
                        <ul className="chat">
                            {msgList.map((v, i) => (
                                <li className={v.type} key={`${i}_li`}>
                                    <div className="userId">{v.id}</div>
                                    <div className={v.type}>{v.msg}</div>
                                </li>
                            ))}
                            <li ref={messagesEndRef} />
                        </ul>
                        <form
                            className="send-form"
                            onSubmit={onSendSubmitHandler}
                        >
                            <input
                                placeholder="Enter your message"
                                onChange={onChangeMsgHandler}
                                value={msg}
                            />
                            <button type="submit">send</button>
                        </form>
                    </div>
                ) : (
                    // 10
                    <div className="login-box">
                        <h1 className="login-title">
                            <img
                                src={sockLogo}
                                width="30px"
                                height="auto"
                                alt="logo"
                            />
                            SockChat
                        </h1>
                        <form className="login-form" onSubmit={onSubmitHandler}>
                            <input
                                placeholder="Enter your ID"
                                onChange={onChangeUserIdHandler}
                                value={userId}
                            />
                            <button type="submit">Login</button>
                        </form>
                    </div>
                )}
            </div>
        </div>
    );
}

export default App;
