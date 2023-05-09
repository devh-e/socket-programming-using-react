// 1
const WebSocket = require("ws");

// 2
const wss = new WebSocket.Server({ port: 5000 });

// 3
wss.on("connection", (ws) => {
    // 4
    const broadCastHandler = (msg) => {
        wss.clients.forEach(function each(client, i) {
            if (client !== ws && client.readyState === WebSocket.OPEN) {
                client.send(msg);
            }
        });
    };

    // 5
    ws.on("message", (res) => {
        const { type, data, id } = JSON.parse(res);
        switch (type) {
            case "id":
                broadCastHandler(
                    JSON.stringify({ type: "welcome", data: data })
                );
                break;
            case "msg":
                broadCastHandler(
                    JSON.stringify({ type: "other", data: data, id: id })
                );
                break;
            default:
                break;
        }
    });

    ws.on("close", () => {
        console.log("client has disconnected");
    });
});
