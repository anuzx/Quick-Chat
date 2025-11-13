import { useEffect, useState, useRef } from "react";

//we want whenever this App component gets mount (render) their should be a persistent websocket connection created , we dont want it on every render but when it comes on the screen for first time , we use useEffect for it
function App() {

const [socket , setSocket] = useState()
const inputRef = useRef(null);
  //how to send a msg
  function sendMessage() {
    if (!socket) {
      return;
    }
    //@ts-expect-error imp
    socket.send(inputRef.current.value)
  }

  useEffect(() => {
    const ws = new WebSocket("ws://localhost:8080"); //initiates a ws connection to the server
   
    setSocket(ws)

    ws.onmessage = (ev) => {
      alert(ev.data);
    };//this is how you recieve a msg
  }, []); //empty dependency tells this code to work only when it mounts for the first time

  return (
    <div
      style={{
        height: "95vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "flex-end",
      }}
    >
      <div style={{}}>
        <input ref={inputRef} placeholder="Message..."></input>
        <button onClick={sendMessage}>Send</button>
      </div>
    </div>
  );
}

export default App;
