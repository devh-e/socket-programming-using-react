const { Server } = require("socket.io");
const io = new Server("5000", {
  cors: {
    origin: "http://127.0.0.1:5500",
  },
});
io.of("/goods").on("connection", (socket) => {
  console.log("goods connected");
});
io.sockets.on("connection", (socket) => {
  console.log("user connected");
  socket.broadcast.emit(`welcomeMsg`, `New User is connected`);
  // 1
  socket.on("join", (res) => {
    socket.join(res);
  });
  socket.on("leave", (res) => {
    console.log(res);
    socket.leave(res);
  });
  socket.on("message", (data) => {
    console.log("From client: ", data);
    console.log(socket.rooms);
    // 2
    const myRooms = Array.from(socket.rooms);
    // 3
    myRooms.length > 1
      ? socket.broadcast.in(myRooms[1]).emit("sMessage", data)
      : socket.broadcast.emit("sMessage", data);
  });
  socket.on("disconnect", () => {
    console.log("user disconnected");
  });
});
