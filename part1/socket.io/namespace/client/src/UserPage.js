import React, { useEffect, useState } from "react";
import { socketUser } from "./socket";

const UserPage = () => {
    const [isConnect, setIsConnect] = useState(false);
    useEffect(() => {
        function onConnect() {
            setIsConnect(true);
        }
        function onDisConnect() {
            setIsConnect(false);
        }
        socketUser.on("connect", onConnect);
        socketUser.on("disconnect", onDisConnect);

        return () => {
            socketUser.off("connect", onConnect);
            socketUser.off("disconnect", onDisConnect);
        };
    }, []);
    const onConnectHandler = () => {
        socketUser.connect();
    };
    const onDisConnectHandler = () => {
        socketUser.disconnect();
    };
    return (
        <div className="text-wrap">
            <h1>
                UserNameSpace is
                {isConnect ? (
                    <em className="active"> Connected!</em>
                ) : (
                    <em className="deactive"> Not Connected!</em>
                )}
            </h1>
            <div className="btn-box">
                <button onClick={onConnectHandler} className="active-btn">
                    Connected
                </button>
                <button onClick={onDisConnectHandler} className="deactive-btn">
                    Disconnected
                </button>
            </div>
        </div>
    );
};

export default UserPage;
