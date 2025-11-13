import { WebSocketServer, WebSocket } from "ws";
const ws = new WebSocketServer({ port: 8080 });
let allSockets = [];
ws.on("connection", (socket) => {
    console.log("New client connected");
    socket.on("message", (message) => {
        //in websockets you cannot communicate through json-objects , u can only communicate binary or string
        const parseMessage = JSON.parse(message); //convert string into object
        if (parseMessage.type === "join") {
            //add user to a room
            allSockets.push({
                socket,
                room: parseMessage.payload.roomId,
            });
        }
        if (parseMessage.type === "chat") {
            // Find the current user's room
            const currentUser = allSockets.find((user) => user.socket === socket);
            //it will iterate over the array and return the 1st element for which the call back fxn returns true value
            if (currentUser) {
                // Broadcast message to all users in the same room
                for (let i = 0; i < allSockets.length; i++) {
                    if (allSockets[i]?.room === currentUser.room) {
                        allSockets[i]?.socket.send(parseMessage.payload.message);
                    }
                }
            }
        }
    });
});
//# sourceMappingURL=index.js.map