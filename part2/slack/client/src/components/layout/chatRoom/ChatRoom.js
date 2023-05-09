import React, { useState, useContext, useEffect, useRef } from "react";
import { css } from "@emotion/react";
import { Context } from "../../../context";
import {
    chatRoomWrapCss,
    subTitleCss,
    chatBoxCss,
    chatBoxGuidCss,
    chatCss,
} from "./ChatRoom.style";
import { TextEditor, GroupTextInput } from "../../index";
import { socketPrivate, socketGroup } from "../../../socket";
import logo from "../../../images/logo.png";
import dayjs from "dayjs";

const ChatRoom = () => {
    // 1
    const {
        state: { currentChat, loginInfo, groupChat, userList },
    } = useContext(Context);
    const reactQuillRef = useRef(null);
    const [text, setText] = useState("");
    const [groupUser, setGroupUser] = useState("");
    const [msgList, setMsgList] = useState([]);
    const [groupChatUsers, setGroupChatUsers] = useState([]);

    // 2
    useEffect(() => {
        function setPrivateMsgListHandler(data) {
            const { msg, fromUserId, toUserId, time } = data;
            if (
                currentChat.roomNumber === `${fromUserId}-${toUserId}` ||
                currentChat.roomNumber === `${toUserId}-${fromUserId}`
            ) {
                setMsgList((prev) => [
                    ...prev,
                    {
                        msg: msg,
                        userId: fromUserId,
                        time,
                    },
                ]);
            }
        }
        socketPrivate.on("private-msg", setPrivateMsgListHandler);
        return () => {
            socketPrivate.off("private-msg", setPrivateMsgListHandler);
        };
    }, [currentChat.roomNumber]);

    // 3
    useEffect(() => {
        function setGroupMsgListHandler(data) {
            const { msg, toUserSocketId, fromUserId, time } = data;
            if (currentChat.roomNumber === toUserSocketId) {
                setMsgList((prev) => [
                    ...prev,
                    {
                        msg: msg,
                        userId: fromUserId,
                        time,
                    },
                ]);
            }
        }
        socketGroup.on("group-msg", setGroupMsgListHandler);
        return () => {
            socketGroup.off("group-msg", setGroupMsgListHandler);
        };
    }, [currentChat.roomNumber]);

    // 4
    useEffect(() => {
        function setMsgListInit(data) {
            setMsgList(
                data.msg.map((m) => ({
                    msg: m.msg,
                    userId: m.fromUserId,
                    time: m.time,
                }))
            );
        }
        socketPrivate.on("private-msg-init", setMsgListInit);
        return () => {
            socketPrivate.off("private-msg-init", setMsgListInit);
        };
    }, []);

    // 5
    useEffect(() => {
        function setGroupMsgListInit(data) {
            setMsgList(
                data.msg.map((m) => ({
                    msg: m.msg,
                    userId: m.fromUserId,
                    time: m.time,
                }))
            );
        }
        socketGroup.on("group-msg-init", setGroupMsgListInit);
        return () => {
            socketGroup.off("group-msg-init", setGroupMsgListInit);
        };
    }, []);

    // 6
    useEffect(() => {
        return () => {
            setMsgList([]);
        };
    }, [currentChat.roomNumber]);

    // 7
    const onPrivateMsgSendHandler = () => {
        const msg = reactQuillRef.current.unprivilegedEditor.getText();
        const currentTime = dayjs().format("HH:mm a");
        setMsgList((prev) => [
            ...prev,
            {
                msg: msg,
                userId: loginInfo.userId,
                time: currentTime,
            },
        ]);
        socketPrivate.emit("privateMsg", {
            msg: msg,
            toUserId: currentChat.targetId[0],
            toUserSocketId: currentChat.targetSocketId,
            fromUserId: loginInfo.userId,
            time: currentTime,
        });
        setText("");
    };

    // 8
    const onGroupSendHandler = (e) => {
        e.preventDefault();
        if (!userList.filter((v) => v.userId === groupUser).length > 0) {
            alert("The user does not exist.");
            setGroupUser("");
            return;
        }
        if (groupUser === loginInfo.userId) {
            alert("Please, Choose someone else.");
            setGroupUser("");
            return;
        }
        setGroupChatUsers([...groupChatUsers, groupUser]);
        setGroupUser("");
    };

    // 9
    const onChangeGroupTextHandler = (e) => {
        setGroupUser(e.target.value);
    };

    // 10
    const groupChatUserCloseClick = (e) => {
        const { id } = e.target.dataset;
        setGroupChatUsers(groupChatUsers.filter((v) => v !== id));
    };

    // 11
    const onJoinClick = () => {
        if (groupChatUsers.length <= 0) return;
        const socketId = [...groupChatUsers, loginInfo.userId].join(",");
        const user = {
            socketId: socketId,
            status: true,
            userId: socketId,
            type: "group",
        };
        socketGroup.emit("reqGroupJoinRoom", user);
        setGroupChatUsers([]);
    };

    // 12
    const onGroupMsgSendHandler = () => {
        const msg = reactQuillRef.current.unprivilegedEditor.getText();
        const currentTime = dayjs().format("HH:mm a");
        setMsgList((prev) => [
            ...prev,
            {
                msg: msg,
                userId: loginInfo.userId,
                time: currentTime,
            },
        ]);
        socketGroup.emit("groupMsg", {
            toUserId: currentChat.targetSocketId,
            toUserSocketId: currentChat.targetSocketId,
            fromUserId: loginInfo.userId,
            msg: msg,
            time: currentTime,
        });
        setText("");
    };
    return (
        <article css={chatRoomWrapCss}>
            <div css={subTitleCss}>
                {groupChat.textBarStatus ? (
                    <GroupTextInput
                        groupText={groupUser}
                        onChangeGroupTextHandler={onChangeGroupTextHandler}
                        groupChatUserList={groupChatUsers}
                        onGroupSendHandler={onGroupSendHandler}
                        groupChatUserCloseClick={groupChatUserCloseClick}
                        onJoinClick={onJoinClick}
                    />
                ) : (
                    currentChat.targetId.map((v) => (
                        <span className="user">{v}</span>
                    ))
                )}
            </div>
            {currentChat.roomNumber ? (
                <ul css={chatBoxCss}>
                    {msgList.map((v, i) => (
                        <li css={chatCss} key={`${i}-chat`}>
                            <div className="userBox">
                                <span className="user">{v.userId}</span>
                                <span className="date">{v.time}</span>
                            </div>
                            <div className="textBox">{v.msg}</div>
                        </li>
                    ))}
                </ul>
            ) : (
                <div css={chatBoxGuidCss}>
                    <img src={logo} width="100px" height="auto" alt="logo" />
                    <div className="guide">Please, Choose a conversation.</div>
                </div>
            )}
            {currentChat.roomNumber && (
                <TextEditor
                    onSendHandler={
                        currentChat.targetId.length > 1
                            ? onGroupMsgSendHandler
                            : onPrivateMsgSendHandler
                    }
                    text={text}
                    reactQuillRef={reactQuillRef}
                    onChangeTextHandler={setText}
                />
            )}
        </article>
    );
};

export default ChatRoom;
