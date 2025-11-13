import { useState, useRef } from "react";
import JoinRoom from "./components/JoinRoom";
import ChatRoom from "./components/ChatRoom";

function App() {
  const [currentScreen, setCurrentScreen] = useState("join");
  const [roomId, setRoomId] = useState("");
  const [username, setUsername] = useState("");
  const [messages, setMessages] = useState([]);

  const wsRef = useRef(null);

  // Handle joining a room
  const handleJoinRoom = (room: string, user: string) => {
    const ws = new WebSocket("ws://localhost:8080");
    wsRef.current = ws;

    ws.onopen = () => {
      console.log("WebSocket connected");
      ws.send(
        JSON.stringify({
          type: "join",
          payload: {
            roomId: room,
            username: user,
          },
        })
      );
      setRoomId(room);
      setUsername(user);
      setCurrentScreen("chat");
    };

    ws.onmessage = (ev) => {
      setMessages((m) => [...m, JSON.parse(ev.data)]);
    };

    ws.onerror = (error) => {
      console.error("WebSocket error:", error);
      alert("Connection failed. Make sure the server is running on port 8080");
    };

    ws.onclose = () => {
      console.log("WebSocket disconnected");
      setCurrentScreen("join");
      setMessages([]);
    };
  };

  // Handle sending a message
  const handleSendMessage = (message: string) => {
    wsRef.current?.send(
      JSON.stringify({
        type: "chat",
        payload: {
          message: message,
        },
      })
    );
  };

  // Handle leaving a room
  const handleLeaveRoom = () => {
    wsRef.current?.close();
    setCurrentScreen("join");
    setMessages([]);
    setRoomId("");
    setUsername("");
  };

  // Render the appropriate screen
  if (currentScreen === "join") {
    return <JoinRoom onJoinRoom={handleJoinRoom} />;
  }

  return (
    <ChatRoom
      roomId={roomId}
      username={username}
      messages={messages}
      onSendMessage={handleSendMessage}
      onLeaveRoom={handleLeaveRoom}
    />
  );
}

export default App;
