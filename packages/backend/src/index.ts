const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const db = require('./database');
const upload = require('./photos');
const questions = require('./questions');
require('./scheduler'); // Import the scheduler to initialize it

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

// API endpoints
app.post('/api/posts', upload.single('photo'), (req, res) => {
    const { user_address } = req.body;
    const photoUrl = req.file ? '/uploads/' + req.file.filename : null; // Get photo URL if uploaded

    // Insert post into database
    db.run('INSERT INTO posts (user_address, photo_url) VALUES (?, ?)',
        [user_address, photoUrl],
        (err) => {
            if (err) {
                console.error('Error inserting post:', err);
                res.status(500).json({ error: 'Internal server error' });
            } else {
                console.log('Post inserted into database');
                res.status(201).json({ message: 'Post created successfully' });
            }
        }
    );
});

app.get('/api/posts', (req, res) => {
    // Fetch all posts from database
    db.all('SELECT * FROM posts', (err, rows) => {
        if (err) {
            console.error('Error fetching posts:', err);
            res.status(500).json({ error: 'Internal server error' });
        } else {
            res.json(rows);
        }
    });
});





// Socket.IO connection handling
io.on('connection', (socket) => {
    console.log('Client connected');

    socket.on('disconnect', () => {
        console.log('Client disconnected');
    });
});

server.listen(8545, () => {
    console.log('Server running on port 8545');
});
