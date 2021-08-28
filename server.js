const express = require('express');
const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);
const players = {};

const port = 8081; // port the server will listen on, hardcoded for now, can make this dynamic in an environment variable later

let playerCount = 0; // keeps track of number of players, assigns them a colour based on the order they joined (limiting to 4 for now)
const colours = ['red', 'blue', 'green', 'purple'];

app.use(express.static(__dirname + '/public'));

app.get('/', (req, res) => { // serves frontend code, all in public folder
    req.sendFile(__dirname + '/index.html');
});

io.on('connection', (socket) => { // socket.io connection
    console.log('a user connected');

    // create a new player and add it to our players object
    playerCount++;
    players[socket.id] = {
        playerId: socket.id,
        colour: colours[playerCount-1]
    };
    // send the players object to the new player
    socket.emit('currentPlayers', players);
    // update all other players of the new player
    socket.broadcast.emit('newPlayer', players[socket.id]);
  
    socket.on('disconnect', function () {
        // remove this player from our players object
        delete players[socket.id];
        playerCount--;
        // emit a message to all players to remove this player
        io.emit('disconnect', socket.id);
      console.log('user disconnected');
    });
});

server.listen(port, () => { // main server
    console.log(`Listening on port ${port}`);
});