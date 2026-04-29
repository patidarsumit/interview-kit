import {WebSocketServer} from 'ws';

const server = new WebSocketServer({port: 8080});

server.on('connection', (socket) => {
  socket.send(JSON.stringify({type: 'connected'}));

  socket.on('message', (message) => {
    socket.send(JSON.stringify({type: 'echo', message: message.toString()}));
  });
});

