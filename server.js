const express = require('express');
const http = require('http');
const { Server } = require("socket.io");
const mysql = require('mysql2/promise');
const path = require('path');
const bcrypt = require('bcrypt');

const app = express();
const server = http.createServer(app);
const io = new Server(server);

const PORT = process.env.PORT || 3000;
const saltRounds = 10;

// MySQL Connection Pool
const db = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '19211921sdF19',
    database: 'rpg_game',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

// Database setup
async function setupDatabase() {
    try {
        const connection = await db.getConnection();
        console.log('Successfully connected to database.');

        const createUsersTable = `
            CREATE TABLE IF NOT EXISTS users (
                id INT AUTO_INCREMENT PRIMARY KEY,
                username VARCHAR(255) NOT NULL UNIQUE,
                password VARCHAR(255) NOT NULL,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
        `;
        await connection.query(createUsersTable);
        console.log('Users table is ready.');

        const createPlayerDataTale = `
            CREATE TABLE IF NOT EXISTS player_data (
                id INT AUTO_INCREMENT PRIMARY KEY,
                user_id INT NOT NULL,
                player_json JSON,
                last_saved_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
                FOREIGN KEY (user_id) REFERENCES users(id)
            )
        `;
        await connection.query(createPlayerDataTale);
        console.log('Player data table is ready.');

        connection.release();
    } catch (err) {
        console.error('Error setting up database:', err);
    }
}

setupDatabase();


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

    // Registration
    socket.on('register', async (data) => {
        const { username, password } = data;
        if (!username || !password) {
            return socket.emit('registrationFailed', 'Username and password are required.');
        }
        try {
            const [rows] = await db.query('SELECT * FROM users WHERE username = ?', [username]);
            if (rows.length > 0) {
                return socket.emit('registrationFailed', 'Username already exists.');
            }

            const hash = await bcrypt.hash(password, saltRounds);
            await db.query('INSERT INTO users (username, password) VALUES (?, ?)', [username, hash]);
            socket.emit('registrationSuccess', 'Registration successful. Please log in.');
        } catch (error) {
            console.error('Registration error:', error);
            socket.emit('registrationFailed', 'An error occurred during registration.');
        }
    });

    // Login
    socket.on('login', async (data) => {
        const { username, password } = data;
        if (!username || !password) {
            return socket.emit('loginFailed', 'Username and password are required.');
        }
        try {
            const [rows] = await db.query('SELECT * FROM users WHERE username = ?', [username]);
            if (rows.length === 0) {
                return socket.emit('loginFailed', 'Invalid username or password.');
            }

            const user = rows[0];
            const match = await bcrypt.compare(password, user.password);

            if (match) {
                // Check if player data exists
                const [playerRows] = await db.query('SELECT * FROM player_data WHERE user_id = ?', [user.id]);
                let playerData;
                if (playerRows.length > 0) {
                    playerData = playerRows[0].player_json;
                }

                socket.emit('loginSuccess', { userId: user.id, playerData });

                // Initialize player in the game world
                players[socket.id] = {
                    x: playerData ? playerData.x : 30,
                    y: playerData ? playerData.y : 20,
                    playerId: socket.id,
                    name: playerData ? playerData.name : username,
                    userId: user.id
                };

                socket.emit('currentPlayers', players);
                socket.broadcast.emit('newPlayer', players[socket.id]);

            } else {
                socket.emit('loginFailed', 'Invalid username or password.');
            }
        } catch (error) {
            console.error('Login error:', error);
            socket.emit('loginFailed', 'An error occurred during login.');
        }
    });

    // Save Player Data
    socket.on('savePlayerData', async (data) => {
        const player = players[socket.id];
        if (!player || !player.userId) return;

        try {
            const [rows] = await db.query('SELECT * FROM player_data WHERE user_id = ?', [player.userId]);
            if (rows.length > 0) {
                await db.query('UPDATE player_data SET player_json = ? WHERE user_id = ?', [JSON.stringify(data), player.userId]);
            } else {
                await db.query('INSERT INTO player_data (user_id, player_json) VALUES (?, ?)', [player.userId, JSON.stringify(data)]);
            }
            socket.emit('saveSuccess', 'Game saved successfully!');
        } catch (error) {
            console.error('Save game error:', error);
            socket.emit('saveFailed', 'Error saving game.');
        }
    });


    socket.on('disconnect', () => {
        console.log(`User disconnected: ${socket.id}`);
        delete players[socket.id];
        io.emit('playerDisconnected', socket.id);
    });

    socket.on('setPlayerName', (name) => {
        if (players[socket.id]) {
            players[socket.id].name = name;
            io.emit('playerNameUpdated', { playerId: socket.id, name: name });
        }
    });

    socket.on('playerMovement', (movementData) => {
        const player = players[socket.id] || {};
        player.x = movementData.x;
        player.y = movementData.y;
        socket.broadcast.emit('playerMoved', player);
    });
});

server.listen(PORT, () => {
    console.log(`Server listening on *:${PORT}`);
});