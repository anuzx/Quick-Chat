import { WebSocketServer, WebSocket } from "ws";
const ws = new WebSocketServer({ port: 8080 });
let allSockets = [];
ws.on("connection", (socket) => {
    allSockets.push(socket);
    console.log('New client connected!');
    socket.on("message", (message) => {
        allSockets.forEach((s) => {
            s.send(message.toString() + ":sent from the server");
        });
    });
});
//# sourceMappingURL=index.js.map