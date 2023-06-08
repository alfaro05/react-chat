// Option #3
// import io from 'socket.io-client'
// io() globally available thanks to socket "io" client library through CDN
const socket = io("ws://localhost:8080");

let inputMsg = document.querySelector("#inputMsg");
let sendBtn = document.querySelector("button");

// message comming from the server
socket.on("receive-message", (message) => {
    console.log(message);
    const el = document.createElement("li");
    el.textContent = message;
    document.querySelector("ul").appendChild(el);
});

// sending message to the server
sendBtn.addEventListener("click", () => {
    let message = inputMsg.value;
    console.log(message);
    socket.emit("send-message", message);
    inputMsg.value = "";
});