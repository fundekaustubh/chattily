import "./App.css";
import io from "socket.io-client";
import { useState } from "react";

const socket = io.connect("http://localhost:3001");

const App = () => {

  const sendMessage = async (e) => {
    e.preventDefault();
    await socket.emit("sendMessage", { message: "hello!" });
  }

  const disconnect = async (e) => {
    e.preventDefault();
    await socket.disconnect();
  }

  return (
    socket && <div>Currently, socket has been connected! Click <button onClick={sendMessage}>here</button> to communicate via events, and <button onClick={disconnect}>here</button> to disconnect!</div>
  )
}

export default App;