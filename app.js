const express = require("express");
const socket = require("socket.io");
const cors = require('cors');

const app = express();

app.use(express.static("public"));
const port = 5000;

app.use(cors());

// start listening for visitors on port 
let server = app.listen(port, ()=>{
    console.log("listening to port " + port);
})

let io = socket(server);

io.on("connection", (socket)=> {
    console.log("Made socket connection");
    
    // Receive data from frontend
    socket.on("beginPath", (data) =>{
        //transfer data to all connected devices
        io.sockets.emit("beginPath", data);
    })

    socket.on("drawStroke", (data)=> {
        io.sockets.emit("drawStroke", data);
    })
    socket.on("redoUndo", (data) =>{
        io.sockets.emit("redoUndo", data);
    })
})