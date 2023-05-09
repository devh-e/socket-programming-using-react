// 1
const net = require("net");

//2
const server = net.createServer((socket) => {
  // 3
  socket.on("data", (data) => {
    console.log("From client:", data.toString());
  });
  // 4
  socket.on("close", () => {
    console.log("client disconnected.");
  });
  // 5
  socket.write("welcome to server");
});

server.on("error", (err) => {
  console.log("err" + err);
});

// 6
server.listen(5000, () => {
  console.log("listening on 5000");
});
