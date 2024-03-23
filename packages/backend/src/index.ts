const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const db = require('./database');
const upload = require('./photos');
const questions = require('./questions');
require('./scheduler'); // Import the scheduler to initialize it
const { action_tally, action_open, action_givePostReward, getBalance } = require('./contract')


const app = express();
const server = http.createServer(app);
const io = socketIo(server);

// API endpoints
app.post('/api/posts', upload.single('photo'), (req, res) => {
    const { user_address } = req.body;
    const photoUrl = req.file ? '/uploads/' + req.file.filename : null; // Get photo URL if uploaded

    // Update post in database
    db.run('UPDATE posts SET photo_url = ? WHERE user_address = ?',
        [photoUrl, user_address],
        (err) => {
            if (err) {
                console.error('Error updating post:', err);
                res.status(500).json({ error: 'Internal server error' });
            } else {
                console.log('Post updated in database');
                res.status(200).json({ message: 'Post updated successfully' });
            }
        }
    );
    action_givePostReward(user_address);
});

app.get('/api/balance', (req, res) => {
    const { user_address } = req.body
    const balance = getBalance(user_address);
    res.status(200).json({balance: balance})
})

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

