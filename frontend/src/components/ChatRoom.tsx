import { useState } from "react";

interface Message {
  username: string;
  message: string;
}

interface ChatRoomProps {
  roomId: string;
  username: string;
  messages: Message[];
  onSendMessage: (message: string) => void;
  onLeaveRoom: () => void;
}

function ChatRoom({
  roomId,
  username,
  messages,
  onSendMessage,
  onLeaveRoom,
}: ChatRoomProps) {
  const [inputMessage, setInputMessage] = useState("");

  const handleSend = () => {
    if (!inputMessage.trim()) return;
    onSendMessage(inputMessage.trim());
    setInputMessage("");
  };

  return (
    <div className="h-screen bg-gray-900 flex flex-col">
      {/* Header */}
      <div className="bg-gray-800 px-6 py-4 flex items-center justify-between border-b border-gray-700">
        <div>
          <h2 className="text-xl font-bold text-white">Room: {roomId}</h2>
          <p className="text-sm text-gray-400">Logged in as {username}</p>
        </div>
        <button
          onClick={onLeaveRoom}
          className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition duration-200 text-sm font-medium"
        >
          Leave Room
        </button>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-6 space-y-3">
        {messages.length === 0 ? (
          <div className="text-center text-gray-500 mt-20">
            <p className="text-lg">No messages yet</p>
            <p className="text-sm">Be the first to send a message!</p>
          </div>
        ) : (
          messages.map((msg, index) => (
            <div key={index} className="flex items-start space-x-3">
              <div
                className={`rounded-lg px-4 py-2 max-w-md shadow-md ${
                  msg.username === "System"
                    ? "bg-gray-700 text-gray-300 text-sm italic"
                    : "bg-blue-600 text-white"
                }`}
              >
                {msg.username !== "System" && (
                  <p className="font-semibold text-sm text-blue-200">
                    {msg.username}
                  </p>
                )}
                <p className="break-words">{msg.message}</p>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Input */}
      <div className="bg-gray-800 px-6 py-4 border-t border-gray-700">
        <div className="flex space-x-3">
          <input
            type="text"
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && handleSend()}
            placeholder="Type a message..."
            className="flex-1 px-4 py-3 rounded-lg bg-gray-700 text-white placeholder-gray-400 outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={handleSend}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition duration-200 font-semibold"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
}

export default ChatRoom;
