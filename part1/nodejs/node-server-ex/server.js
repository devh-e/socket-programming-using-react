// 1
const http = require("http");
const fs = require("fs").promises;
const url = require("url");

// 2
const server = http
  .createServer(async (req, res) => {
    // 3
    const pathname = url.parse(req.url).pathname;
    const method = req.method;
    let data = null;

    console.log(url.parse(req.url));

    
    // 4
    if (method === "GET") {
      switch (pathname) {
        case "/":
          res.writeHead(200, {
            "Content-Type": "text/html; charset=utf-8",
          });
          data = await fs.readFile("./index.html");
          res.end(data);
          break;
        default:
          res.writeHead(400, {
            "Content-Type": "text/html; charset=utf-8",
          });
          data = await fs.readFile("./index.html");
          res.end(data);
      }
    }
  })
  .listen(5000);

// 5
server.on("listening", () => {
  console.log("5000 port is running");
});
// 6
server.on("error", (err) => {
  console.log(err);
});
