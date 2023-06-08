const http = require("http").createServer();

const io = require("socket.io")(http, {
    cors: {
        origin: "*",
    },
});

let PORT = 8080;
let connectedUsers = 0;

io.on("connection", (socket) => {
    console.log(`[${socket.id}] has connected`);
    connectedUsers++;
    console.log(`Connected users: ${connectedUsers}`);
    // listening event
    socket.on("send-message", (message) => {
        console.log(message);
        // send data to everybody even myself
        io.emit("receive-message", `[${socket.id.substr(0, 4)}]: ${message}`);
        // send data to everybody except publisher
        // socket.broadcast.emit("receive-message", message);
    });
});

http.listen(PORT, () => console.log(`Server listening at http://localhost:${PORT}`));

