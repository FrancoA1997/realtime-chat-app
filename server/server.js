const express = require("express");
const http = require('http')
const app = express()
const server = http.createServer(app);
const {Server} = require('socket.io')
const io = new Server(server);
const path = require("path")
const PORT = process.env.PORT || '3000';
const HOSTNAME = process.env.HOSTNAME || 'localhost';

const publicPath = path.join(__dirname, "/../public")

app.get('/', (req, res) => {
    res.sendFile(publicPath + '/index.html');
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