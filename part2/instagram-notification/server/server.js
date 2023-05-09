// 1
const { Server } = require("socket.io");
const { posts } = require("./data");

// 2
const io = new Server("5000", {
    cors: {
        origin: "http://localhost:3000",
    },
});

// 3
let users = [];

// 4
const addNewUser = (userName, socketId) => {
    !users.some((user) => user.userName === userName) &&
        users.unshift({
            ...posts[Math.floor(Math.random() * 5)],
            userName,
            socketId,
        });
};

// 5
const getUser = (userName) => {
    return users.find((user) => user.userName === userName);
};
// 6
io.use((socket, next) => {
    const userName = socket.handshake.auth.userName;
    if (!userName) {
        console.log("err");
        return next(new Error("invalid userName"));
    }
    socket.userName = userName;
    next();
});

io.on("connection", (socket) => {
    // 7
    addNewUser(socket.userName, socket.id);

    // 8
    socket.on('userList', () => {
      io.sockets.emit("user-list", users);
    })

    // 9
    socket.on("sendNotification", ({ senderName, receiverName, type }) => {
        const receiver = getUser(receiverName);
        io.to(receiver.socketId).emit("getNotification", {
            senderName,
            type,
        });
    });

    socket.on("disconnect", () => {
        console.log("logout");
    });
});
