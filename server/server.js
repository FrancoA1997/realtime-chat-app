const express = require("express");
const http = require('http')
const app = express()
let server = http.createServer(app)

const PORT = process.env.PORT || '3000';
const HOSTNAME = process.env.HOSTNAME || 'localhost';

app.use(express.static("app/public"))

const io = require('socket.io')(http, {
    cors: {origin: "*"}

});

io.on('connection', (socket) => {
    console.log('a user connected')
    socket.on('message', (message) =>{
        console.log(message);
        io.emit('message', `${socket.id.substr(0, 2)} said ${message}`);
    });
});


server.listen(PORT, () =>{
    console.log(`Server is running at http://${HOSTNAME}:${PORT}`);
});