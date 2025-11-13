import { WebSocketServer, WebSocket } from "ws";

const ws = new WebSocketServer({ port: 8080 })

interface User {
    socket: WebSocket; //here socket is like a user
    room: string;
}

let allSockets: User[] = [];

ws.on("connection", (socket) => {
   

socket.on("message", (message) => {
    //in websockets you cannot communicate through json-objects , u can only communicate binary or string
    
    const parseMessage = JSON.parse(message as unknown as string) //convert string into object
    if (parseMessage.type === "join") {
        allSockets.push({
            socket,
            room:parseMessage.payload.roomId
        })
    }

    if (parseMessage.type === "chat") {
        const currentUserRoom = allSockets.find((x)=>x.socket == socket) //it will iterate over the array and return the 1st element for which the call back fxn returns true value
    }
});
    
})