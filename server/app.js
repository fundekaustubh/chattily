// Importing statements
if (process.env.NODE_ENV !== "production") {
    require('dotenv').config();
}
const app = require('express')();
const http = require('http');
const cors = require('cors');
const { Server } = require('socket.io');

// Middleware
app.use(cors());

const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: process.env.FRONTEND_URL,
        methods: ['GET', 'POST']
    }
})

io.on("connection", (socket) => {
    console.log("New socket connection: ", socket.id);

    socket.on("join_room", (data) => {
        socket.join(data);
        console.log(`User with id = ${socket.id} has joined room ${data}...`);
    })

    socket.on("disconnect", () => {
        console.log("User disconnected: ", socket.id);
    })
})

server.listen(process.env.BACKEND_PORT, () => {
    console.log(`Backend started on port ${process.env.BACKEND_PORT}`);
})