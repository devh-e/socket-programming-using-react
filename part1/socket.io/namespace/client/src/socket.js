import { io } from "socket.io-client";

// 1
export const socketGoods = io("http://localhost:5000/goods", {
    autoConnect: false,
});
// 2
export const socketUser = io("http://localhost:5000/user", {
    autoConnect: false,
});
