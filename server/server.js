const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');
const {Users} = require('./utils/users.js');

const app = express();
const publicPath = path.join(__dirname, '..', 'public');
const port = process.env.PORT || 3000;
var server = http.createServer(app);
var io = socketIO(server);

app.use(express.static(publicPath));

var users = new Users();

app.get('*', (req, res) => {
  res.sendFile(path.join(publicPath, 'index.html'));
});

io.on('connection', (socket) => {
  socket.on('online',(params,callback) => {
    users.removeUser(socket.id);
    users.addUser(socket.id,params.uid,params.name,"user_online");
    io.emit('updateOnlineList',users.getUserList());
  });

  socket.on('sendMassage',(params) => { 
    const otruser = users.getUserById(params.to);
    const massage = {
      msgId:  Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15),
      ...params
    }
    socket.broadcast.to(otruser.socketId).emit('getMassage', massage);
    socket.broadcast.to(otruser.socketId).emit('updateOnlineList',users.getUserList());
  });
  
  socket.on('disconnect', () => {
    users.removeUser(socket.id);
    io.emit('updateOnlineList',users.getUserList());
  });
});

server.listen(port, () => {
  console.log('Server is up!');
});
