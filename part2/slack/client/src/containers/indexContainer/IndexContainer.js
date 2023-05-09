import React, { useState, useEffect } from "react";
import { css } from "@emotion/react";
import {
  indexContainerCss,
  loginWrapCss,
  headerCss,
  loginFormCss,
  inputCss,
  btnCss,
} from "./IndexContainer.style";
// 1
import { socket, socketPrivate, socketGroup } from "../../socket";
import { useNavigate } from "react-router-dom";
import logo from "../../images/logo.png";

const IndexContainer = () => {
  const [user, setUser] = useState("");
  const navigate = useNavigate();
  // 2
  useEffect(() => {
    socket.on("connect_error", (err) => {
      if (err.message === "invalid userId") {
        console.log("err");
      }
    });
  }, []);
  // 3
  const onLoginHandler = (e) => {
    e.preventDefault();
    if (!user) return;
    socket.auth = { userId: user };
    socket.connect();
    socketPrivate.auth = { userId: user };
    socketPrivate.connect();
    socketGroup.auth = { userId: user };
    socketGroup.connect();
    navigate("/main");
  };
  // 4
  const onUserNameHandler = (e) => {
    setUser(e.target.value);
  };
  return (
    <div css={indexContainerCss}>
      <div css={loginWrapCss}>
        <h1 css={headerCss}>
          <img src={logo} width="100px" height="auto" alt="logo" />
        </h1>
        <form css={loginFormCss} onSubmit={onLoginHandler}>
          <input
            css={inputCss}
            type="text"
            value={user}
            placeholder="Enter your ID"
            onChange={onUserNameHandler}
          />
          <button onClick={onLoginHandler} css={btnCss}>
            Sign in
          </button>
        </form>
      </div>
    </div>
  );
};

export default IndexContainer;
