// 1
const http = require("http");
const sockjs = require("sockjs");

// 2
const sock = sockjs.createServer();

// 3
const clients = new Map();

// 4
sock.on("connection", function (conn) {
  let myId = "";
  // 5
  conn.on("data", function (message) {
    const { data, type, id } = JSON.parse(message);
    // 6
    switch (type) {
      case "id":
        myId = data;
        clients.set(data, conn);
        break;
      case "msg":
        clients.forEach((value, key, map) => {
          if (key !== myId) {
            value.write(JSON.stringify({ data: data, id: id }));
          }
        });
        break;
      default:
        break;
    }
  });
  conn.on("close", function () {
    clients.delete(myId);
  });
});

// 7
const server = http.createServer();
sock.installHandlers(server, { prefix: "/sock" });
server.listen(9999, "0.0.0.0");
