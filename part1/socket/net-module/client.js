const net = require("net");
// 1
const socket = net.connect({ port: 5000 });
socket.on("connect", () => {
  console.log("connected to server!");
  // 2
  setInterval(() => {
    socket.write("Hello.");
  }, 1000);
});
// 3
socket.on("data", (chunk) => {
  console.log("From Server:" + chunk);
});
// 4
socket.on("end", () => {
  console.log("disconnected.");
});
socket.on("error", (err) => {
  console.log(err);
});
// 5
socket.on("timeout", () => {
  console.log("connection timeout.");
});
