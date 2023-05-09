import React, { useEffect, useState } from "react";
// 1
import { socketGoods } from "./socket";

const GoodsPage = () => {
    // 2
    const [isConnect, setIsConnect] = useState(false);
    // 3
    useEffect(() => {
        function onConnect() {
            setIsConnect(true);
        }
        function onDisConnect() {
            setIsConnect(false);
        }
        socketGoods.on("connect", onConnect);
        socketGoods.on("disconnect", onDisConnect);

        return () => {
            socketGoods.off("connect", onConnect);
            socketGoods.off("disconnect", onDisConnect);
        };
    }, []);
    // 4
    const onConnectHandler = () => {
        socketGoods.connect();
    };
    // 5
    const onDisConnectHandler = () => {
        socketGoods.disconnect();
    };
    return (
        <div className="text-wrap">
            <h1>
                GoodsNameSpace is
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

export default GoodsPage;
