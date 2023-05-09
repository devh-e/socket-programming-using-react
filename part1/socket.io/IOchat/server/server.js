// 1
const { Server } = require("socket.io");

// 2
const io = new Server("5000", {
  cors: {
    origin: "http://localhost:3000",
  },
});

// 3
io.sockets.on("connection", (socket) => {
  // 4
  socket.on("message", (data) => {
    // 5
    io.sockets.emit("sMessage", data);
  });
  socket.on("login", (data) => {
    io.sockets.emit("sLogin", data);
  });
  // 6
  socket.on("disconnect", () => {
    console.log("user disconnected");
  });
});
