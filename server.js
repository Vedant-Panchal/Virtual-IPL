const express = require('express');
const http = require('http');
const socketIO = require('socket.io');
const fs = require('fs');
const app = express();
const server = http.createServer(app);
const io = socketIO(server);

const PORT = process.env.PORT || 3000;

app.use(express.static(__dirname));
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/main.html');
});
app.get('/data.json', (req, res) => {
  res.sendFile(__dirname + '/data.json');
});
app.get('/playerData.json', (req, res) => {
  res.sendFile(__dirname + '/playerData.json');
});

io.on('connection', (socket) => {
  console.log('A client connected.');

  fs.watchFile(__dirname + '/data.json', (curr, prev) => {
    fs.readFile(__dirname + '/data.json', 'utf-8', (err, data) => {
      if (err) throw err;
      io.emit('team-update', JSON.parse(data));
    });
  });

  fs.watchFile(__dirname + '/playerData.json', (curr, prev) => {
    fs.readFile(__dirname + '/playerData.json', 'utf-8', (err, data) => {
      if (err) throw err;
      io.emit('player-update', JSON.parse(data));
    });
  });

  socket.on('disconnect', () => {
    console.log('A client disconnected.');
  });
});

server.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
