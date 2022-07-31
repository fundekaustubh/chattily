import io from "socket.io-client";
import './App.css';
import { useState } from 'react';
const socket = io.connect(process.env.REACT_APP_BACKEND_URL);
const App = () => {
  const [username, setUsername] = useState(undefined);
  const [room, setRoom] = useState(undefined);

  const joinRoom = () => {
    if (username && room) {
      socket.emit("join_room", room);
    }
  }

  const disconnectUser = () => {
    console.log("Disconnect user function called!");
    socket.disconnect();
  }

  console.log("Socket connected! ", socket);
  return (
    <div className="bg-[#222831] h-screen w-screen overflow-x-hidden">
      <p className="text-6xl font-mono w-full flex justify-center align-center my-6 text-slate-200">Chattily</p>
      <div className="flex justify-center align-center my-6">
        <p className="typing font-mono w-full text-4xl w-auto text-slate-200">
          Experience texting like never before!
        </p>
      </div>

      <div className="p-2 mb-6 text-center h-auto flex justify-center align-center p-4">
        <input type="text" placeholder={"Enter username..."} className="mt-1 block px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400
      focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500" onChange={(evt) => setUsername(evt.target.value)} />
      </div>

      <div className="p-2 text-center h-auto flex justify-center align-center p-4">
        <input type="text" placeholder={"Enter room ID..."} className="mt-1 block px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400
      focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500" onChange={(evt) => setRoom(evt.target.value)} />
      </div>

      <button onClick={joinRoom}>Join Room</button>
      <button onClick={disconnectUser}>Disconnect User</button>
    </div>
  )
}
export default App;
