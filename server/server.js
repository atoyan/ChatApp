const path = require('path');
const express = require('express');
const http    = require('http');
const publicPath = path.join(__dirname , "../public");
const port = process.env.PORT || 3000;
const socketIO = require("socket.io"); 

var  app   =  express();
var server  = http.createServer(app);
var io      = socketIO(server);
app.use(express.static(publicPath));

io.on('connection' , socket=>{

    console.log("new user connected");


    socket.on('createMessage',message=>{

        console.log('createMessage', message);
    });

    socket.emit('newMessage',{from:"Andranik Host", text: "message text"});

    socket.on('disconnect', ()=>{

        console.log("user disconnected");
    });

});


server.listen(port, err=>{
    if(err){
        console.log(err);
    }
    console.log(`Server is running on ${port}` );
});
