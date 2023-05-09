import React, { useContext, useEffect } from "react";
import { css } from "@emotion/react";
import { Context } from "../../../context";
import { CURRENT_CHAT, GROUP_CHAT } from "../../../context/action";
import {
  navBarWrapCss,
  titleCss,
  userListCss,
  directMsgCss,
} from "./SideBar.style";
import { User } from "../../index";
import { BiChevronDown } from "react-icons/bi";
import { socketPrivate, socketGroup } from "../../../socket";

const SideBar = () => {
  // 1
  const {
    state: { userList, loginInfo, currentChat, groupList },
    dispatch,
  } = useContext(Context);

  // 2
  useEffect(() => {
    if (currentChat.targetId.length > 1) {
      socketGroup.emit("msgInit", {
        targetId: currentChat.targetId,
      });
    } else {
      socketPrivate.emit("msgInit", {
        targetId: currentChat.targetId,
      });
    }
  }, [currentChat.targetId]);

  // 3
  useEffect(() => {
    function setMsgAlert(data) {
      socketPrivate.emit("resJoinRoom", data.roomNumber);
    }
    socketPrivate.on("msg-alert", setMsgAlert);
    return () => {
      socketPrivate.off("msg-alert", setMsgAlert);
    };
  }, []);

  // 4
  useEffect(() => {
    function setGroupChat(data) {
      socketGroup.emit("resGroupJoinRoom", {
        roomNumber: data.roomNumber,
        socketId: data.socketId,
      });
    }
    socketGroup.on("group-chat-req", setGroupChat);
    return () => {
      socketGroup.off("group-chat-req", setGroupChat);
    };
  }, []);

  // 5
  const onUserClickHandler = (e) => {
    const { id } = e.target.dataset;
    dispatch({
      type: CURRENT_CHAT,
      payload: {
        targetId: [id],
        roomNumber: `${loginInfo.userId}-${id}`,
        targetSocketId: e.target.dataset.socket,
      },
    });
    socketPrivate.emit("reqJoinRoom", {
      targetId: id,
      targetSocketId: e.target.dataset.socket,
    });
    dispatch({
      type: GROUP_CHAT,
      payload: {
        textBarStatus: false,
        groupChatNames: [],
      },
    });
  };

  // 6
  const onMakeGroupChat = () => {
    dispatch({
      type: GROUP_CHAT,
      payload: {
        textBarStatus: true,
        groupChatNames: [],
      },
    });
  };

  // 7
  const onGroupUserClickHandler = (e) => {
    const { id } = e.target.dataset;
    dispatch({
      type: CURRENT_CHAT,
      payload: {
        targetId: [...id.split(",")],
        roomNumber: id,
        targetSocketId: e.target.dataset.socket,
      },
    });
    socketGroup.emit("joinGroupRoom", {
      roomNumber: id,
      socketId: e.target.dataset.socket,
    });
    dispatch({
      type: GROUP_CHAT,
      payload: {
        textBarStatus: false,
        groupChatNames: [],
      },
    });
  };
  return (
    <nav css={navBarWrapCss}>
      <div css={titleCss}> Slack</div>
      <ul css={userListCss}>
        <li css={directMsgCss} onClick={onMakeGroupChat}>
          <BiChevronDown size="20" /> Direct Messages +
        </li>
        {userList.map((v, i) => (
          <li key={`${i}-user`}>
            <User
              id={v.userId}
              status={v.status}
              socket={v.socketId}
              type={v.type}
              onClick={
                v.type === "group"
                  ? onGroupUserClickHandler
                  : onUserClickHandler
              }
            />
          </li>
        ))}
        {groupList.map((v, i) => (
          <li key={`${i}-user`}>
            <User
              id={v.userId}
              status={v.status}
              socket={v.socketId}
              type={v.type}
              onClick={
                v.type === "group"
                  ? onGroupUserClickHandler
                  : onUserClickHandler
              }
            />
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default SideBar;
