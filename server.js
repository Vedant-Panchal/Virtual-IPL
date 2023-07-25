const express = require('express');
const http = require('http');
const socketIO = require('socket.io');
const fs = require('fs');

const app = express();
const server = http.createServer(app);
const io = socketIO(server);

const PORT = process.env.PORT || 3000;

// Serve the main.html and data.json files
app.use(express.static(__dirname));
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/main.html');
});
app.get('/data.json', (req, res) => {
  res.sendFile(__dirname + '/data.json');
});

io.on('connection', (socket) => {
  console.log('A client connected.');

  // Listen for changes to data.json and emit the updates to the clients
  fs.watchFile(__dirname + '/data.json', (curr, prev) => {
    fs.readFile(__dirname + '/data.json', 'utf-8', (err, data) => {
      if (err) throw err;
      io.emit('data-update', JSON.parse(data));
    });
  });

  socket.on('disconnect', () => {
    console.log('A client disconnected.');
  });
});

server.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
