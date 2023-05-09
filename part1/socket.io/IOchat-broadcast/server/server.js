const { Server } = require("socket.io");

const io = new Server("5000", {
    cors: {
        origin: "http://localhost:3000",
    },
});

io.sockets.on("connection", (socket) => {
    socket.on("message", (data) => {
        // 1
        socket.broadcast.emit("sMessage", data);
    });
    socket.on("login", (data) => {
        // 2
        socket.broadcast.emit("sLogin", data);
    });
    socket.on("disconnect", () => {
        console.log("user disconnected");
    });
});
