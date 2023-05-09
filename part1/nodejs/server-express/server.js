const express = require("express");
const app = express();

app.listen(3000, () => {
    console.log("App is running on port 3000");
});

app.get("/", (req, res) => {
    res.sendfile("index.html");
});
