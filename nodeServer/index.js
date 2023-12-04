// const { Socket } = require("socket.io");

const io  = require (socket.io)(8000)

const users = {};

io.on('connection' , socket  => {

    socket.on('new-user-joined' , name => {
        console.log("New User Join" , name);
        users [socket.id] = name;
        socket.broadcast.emit('user-joined' , name);
    });

    socket.on('send' , message =>{
        socket.broadcast.emit('recived' , {message : message , name: users[socket.id]})

    });

    socket.on('disconnect' , message =>{
        socket.broadcast.emit('Left' , users[socket.id] );
        delete users[socket.id];

    });
})
