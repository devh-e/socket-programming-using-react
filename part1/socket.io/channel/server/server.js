const { Server } = require("socket.io");
const io = new Server("5000", {
  cors: {
    origin: "http://127.0.0.1:5500",
    methods: ["GET", "POST"],
  },
});

io.sockets.on("connection", (socket) => {
  console.log("user connected");
  socket.broadcast.emit(`welcomeMsg`, `${socket.id} is connected`);
  socket.emit("socketId", socket.id);
  socket.on("message", (data) => {
    const { msg, target } = JSON.parse(data);
    console.log("From client: ", data);
    target
      ? io.sockets.to(target).emit("sMessage", `private-${msg}`)
      : socket.broadcast.emit("sMessage", msg);
  });
  socket.on("disconnect", () => {
    console.log("user disconnected");
  });
});
