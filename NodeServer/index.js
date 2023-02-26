//Node server which will handle socket io connection
const io = require("socket.io")(8000);


const users = {};
io.on('connection',socket=>{//hadle all the connection in the particular server
  socket.on('new-user-joined', userName=>{//handle specific connection in the server with particular event
     users[socket.id]= userName;
    
     socket.broadcast.emit('user-joined',userName);//send the event to all other user in the server 
  });

 socket.on('send', messageBody =>{//send event
   socket.broadcast.emit('recieve',{message : messageBody , userName : users[socket.id]})
 });
 
 socket.on('disconnect', message=>{//disconnect user
  socket.broadcast.emit('left', users[socket.id]);
  delete users[socket.id];
});
})


