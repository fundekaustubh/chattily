if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}
const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server, {
    cors: {
        origin: process.env.FRONTEND_URL,
        methods: ['GET', 'POST']
    }
});

io.on('connection', (socket) => {
    console.log('Socket connection established: ', socket.id);

    socket.on("sendMessage", ({ message }) => {
        console.log("Message received: ", message);
    })

    socket.on("disconnect", () => {
        console.log(`${socket.id} disconnected!`);
    })
});

server.listen(process.env.BACKEND_PORT, () => {
    console.log(`Listening on port ${process.env.BACKEND_PORT}`);
});