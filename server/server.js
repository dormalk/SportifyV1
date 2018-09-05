const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const app = express();
const publicPath = path.join(__dirname, '..', 'public');
const port = process.env.PORT || 3000;
var server = http.createServer(app);
var io = socketIO(server);

app.use(express.static(publicPath));

app.get('*', (req, res) => {
  res.sendFile(path.join(publicPath, 'index.html'));
});

io.on('connection', (socket) => {
  console.log('New user connected');

  socket.on('massage',(params,callback) => {
    console.log(params);
  });

  socket.on('disconnect', () => {
    console.log('user disconected');
  })
});

server.listen(port, () => {
  console.log('Server is up!');
});
