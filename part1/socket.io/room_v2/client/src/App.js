import React, { useRef, useEffect, useState } from "react";
import "./App.css";
import logo from "./images/iologo.png";
import { io } from "socket.io-client";

const webSocket = io("http://localhost:5000");

function App() {
  const messagesEndRef = useRef(null);
  const [userId, setUserId] = useState("");
  const [isLogin, setIsLogin] = useState(false);
  const [msg, setMsg] = useState("");
  const [msgList, setMsgList] = useState([]);
  const [privateTarget, setPrivateTarget] = useState("");
  // 1
  const [roomNumber, setRoomNumber] = useState("1");

  useEffect(() => {
    if (!webSocket) return;
    function sMessageCallback(msg) {
      const { data, id, target } = msg;
      setMsgList((prev) => [
        ...prev,
        {
          msg: data,
          type: target ? "private" : "other",
          id: id,
        },
      ]);
    }
    webSocket.on("sMessage", sMessageCallback);
    return () => {
      webSocket.off("sMessage", sMessageCallback);
    };
  }, []);

  useEffect(() => {
    if (!webSocket) return;
    function sLoginCallback(msg) {
      setMsgList((prev) => [
        ...prev,
        {
          msg: `${msg} joins the chat`,
          type: "welcome",
          id: "",
        },
      ]);
    }
    webSocket.on("sLogin", sLoginCallback);
    return () => {
      webSocket.off("sLogin", sLoginCallback);
    };
  }, []);
  useEffect(() => {
    scrollToBottom();
  }, [msgList]);
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  // 2
  const onSubmitHandler = (e) => {
    e.preventDefault();
    webSocket.emit("login", { userId: userId, roomNumber: roomNumber });
    setIsLogin(true);
  };
  const onChangeUserIdHandler = (e) => {
    setUserId(e.target.value);
  };
  const onSendSubmitHandler = (e) => {
    e.preventDefault();
    const sendData = {
      data: msg,
      id: userId,
      target: privateTarget,
    };
    webSocket.emit("message", sendData);
    setMsgList((prev) => [...prev, { msg: msg, type: "me", id: userId }]);
    setMsg("");
  };
  const onChangeMsgHandler = (e) => {
    setMsg(e.target.value);
  };
  const onSetPrivateTarget = (e) => {
    const { id } = e.target.dataset;
    setPrivateTarget((prev) => (prev === id ? "" : id));
  };
  // 3
  const onRoomChangeHandler = (e) => {
    setRoomNumber(e.target.value);
  };
  return (
    <div className="app-container">
      <div className="wrap">
        {isLogin ? (
          <div className="chat-box">
            <h3>
              Login as a "{userId}" in Room {roomNumber}
            </h3>
            <ul className="chat">
              {msgList.map((v, i) =>
                v.type === "welcome" ? (
                  <li className="welcome">
                    <div className="line" />
                    <div>{v.msg}</div>
                    <div className="line" />
                  </li>
                ) : (
                  <li
                    className={v.type}
                    key={`${i}_li`}
                    name={v.id}
                    data-id={v.id}
                    onClick={onSetPrivateTarget}
                  >
                    <div
                      className={
                        v.id === privateTarget ? "private-user" : "userId"
                      }
                      data-id={v.id}
                      name={v.id}
                    >
                      {v.id}
                    </div>
                    <div className={v.type} data-id={v.id} name={v.id}>
                      {v.msg}
                    </div>
                  </li>
                )
              )}
              <li ref={messagesEndRef} />
            </ul>
            <form className="send-form" onSubmit={onSendSubmitHandler}>
              {privateTarget && (
                <div className="private-target">{privateTarget}</div>
              )}
              <input
                placeholder="Enter your message"
                onChange={onChangeMsgHandler}
                value={msg}
              />
              <button type="submit">send</button>
            </form>
          </div>
        ) : (
          <div className="login-box">
            <div className="login-title">
              <img src={logo} width="40px" height="40px" alt="logo" />
              <div>IOChat</div>
            </div>
            <form className="login-form" onSubmit={onSubmitHandler}>
              <select onChange={onRoomChangeHandler}>
                <option value="1">Room 1</option>
                <option value="2">Room 2</option>
              </select>
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
