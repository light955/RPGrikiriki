
const express = require('express');
const http = require('http');
const { Server } = require("socket.io");
const mysql = require('mysql2');
const path = require('path');

const app = express();
const server = http.createServer(app);
const io = new Server(server);

const PORT = process.env.PORT || 3000;

// MySQL Connection Pool
// 注意: 以下の情報はご自身の環境に合わせて変更してください
const db = mysql.createPool({
    host: 'localhost',      // データベースのホスト名
    user: 'root',           // データベースのユーザー名
    password: '19211921sdF19',   // データベースのパスワード
    database: 'rpg_game'    // 使用するデータベース名
});

// Check database connection
db.getConnection((err, connection) => {
    if (err) {
        console.error('Error connecting to database:', err.stack);
        return;
    }
    console.log('Successfully connected to database.');
    connection.release();
});

// Serve static files from the root directory
app.use(express.static(path.join(__dirname, '')));

// Handle root URL
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// Store player states
const players = {};

io.on('connection', (socket) => {
    console.log(`A user connected: ${socket.id}`);

    // Create a new player with a default name
    players[socket.id] = {
        x: 30, // Starting X
        y: 20, // Starting Y
        playerId: socket.id,
        name: 'Player' // Default name
    };

    // Send the new player their ID and the current list of all players
    socket.emit('currentPlayers', players);
    
    // Announce the new player to all other players
    socket.broadcast.emit('newPlayer', players[socket.id]);

    socket.on('disconnect', () => {
        console.log(`User disconnected: ${socket.id}`);
        // Remove the player from our players object
        delete players[socket.id];
        // Emit a message to all other players to remove this player
        io.emit('playerDisconnected', socket.id);
    });

    // Listen for player name changes
    socket.on('setPlayerName', (name) => {
        if (players[socket.id]) {
            players[socket.id].name = name;
            // Broadcast the name change to all clients
            io.emit('playerNameUpdated', { playerId: socket.id, name: name });
        }
    });

    // Listen for player movement
    socket.on('playerMovement', (movementData) => {
        const player = players[socket.id] || {};
        player.x = movementData.x;
        player.y = movementData.y;
        // Broadcast the movement to all other players
        socket.broadcast.emit('playerMoved', player);
    });
});

server.listen(PORT, () => {
    console.log(`Server listening on *:${PORT}`);
});
