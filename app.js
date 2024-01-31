const express = require("express");
const socket = require("socket.io");

const app = express();

app.use(express.static("public"));
const port = 5000;

// start listening for visitors on port 
let server = app.listen(port, ()=>{
    console.log("listening to port " + port);
})

let io = socket(server);

io.on("connection", ()=> {
    console.log("Made socket connection")
})