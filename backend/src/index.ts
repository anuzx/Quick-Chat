import { WebSocketServer, WebSocket } from "ws";

const ws = new WebSocketServer({ port: 8080 });

interface User {
  socket: WebSocket;
  room: string;
  username: string;
}

let allSockets: User[] = [];

ws.on("connection", (socket) => {
  console.log("New client connected");

  socket.on("message", (message) => {
    const parseMessage = JSON.parse(message as unknown as string);

    if (parseMessage.type === "join") {
      // Add user to a room with username
      allSockets.push({
        socket,
        room: parseMessage.payload.roomId,
        username: parseMessage.payload.username,
      });

      console.log(
        `${parseMessage.payload.username} joined room: ${parseMessage.payload.roomId}`
      );

      // Send welcome message to the room
      const currentUser = allSockets.find((user) => user.socket === socket);
      if (currentUser) {
        for (let i = 0; i < allSockets.length; i++) {
          if (allSockets[i]?.room === currentUser.room) {
            allSockets[i]?.socket.send(
              JSON.stringify({
                username: "System",
                message: `${parseMessage.payload.username} joined the room`,
              })
            );
          }
        }
      }
    }

    if (parseMessage.type === "chat") {
      // Find the current user's room
      const currentUser = allSockets.find((user) => user.socket === socket);

      if (currentUser) {
        // Broadcast message to all users in the same room with username
        for (let i = 0; i < allSockets.length; i++) {
          if (allSockets[i]?.room === currentUser.room) {
            allSockets[i]?.socket.send(
              JSON.stringify({
                username: currentUser.username,
                message: parseMessage.payload.message,
              })
            );
          }
        }
      }
    }
  });

  socket.on("close", () => {
    // Find the user index in allSockets
    const userIndex = allSockets.findIndex((user) => user.socket === socket);

    // Check if user was found (userIndex !== -1)
    if (userIndex !== -1) {
      const disconnectedUser = allSockets[userIndex]!;

      // Now TypeScript knows disconnectedUser exists
      console.log(
        `${disconnectedUser.username} left room: ${disconnectedUser.room}`
      );

      // Notify others in the room before removing the user
      for (let i = 0; i < allSockets.length; i++) {
        if (allSockets[i]?.room === disconnectedUser.room && i !== userIndex) {
          allSockets[i]?.socket.send(
            JSON.stringify({
              username: "System",
              message: `${disconnectedUser.username} left the room`,
            })
          );
        }
      }

      // Remove the user from the array
      allSockets.splice(userIndex, 1);
    }
  });
});

console.log("WebSocket server running on ws://localhost:8080");
