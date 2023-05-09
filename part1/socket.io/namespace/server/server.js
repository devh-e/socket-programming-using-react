const { Server } = require("socket.io");

const io = new Server("5000", {
    cors: {
        origin: "http://localhost:3000",
    },
});
// 1
io.of("/goods").on("connection", (socket) => {
    console.log("goods connected");
    socket.on("shoes", (res) => {});
    socket.on("pants", (res) => {});
});
// 2
io.of("/user").on("connection", (socket) => {
    console.log("user connected");
    socket.on("admin", (res) => {});
});
