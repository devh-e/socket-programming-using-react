const { Server } = require("socket.io");

const io = new Server("5000", {
  cors: {
    origin: "http://localhost:3000",
  },
});

// 1
const clients = new Map();

io.sockets.on("connection", (socket) => {
  console.log("user connected");
  socket.on("message", (res) => {
    const { target } = res;
    // 2
    const toUser = clients.get(target);
    target
      ? io.sockets.to(toUser).emit("sMessage", res)
      : socket.broadcast.emit("sMessage", res);
  });
  socket.on("login", (data) => {
    // 3
    clients.set(data, socket.id);
    socket.broadcast.emit("sLogin", data);
  });
  socket.on("disconnect", () => {
    console.log("user disconnected");
  });
});
