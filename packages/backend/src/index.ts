const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const { db } = require('./database');
const { upload }= require('./photo');
const { questions } = require('./questions');
const { action_tally, action_open, action_givePostReward, getBalance } = require('./contract')
require('./scheduler'); // Import the scheduler to initialize it


const app = express();
app.use(express.json());
const server = http.createServer(app);
const io = socketIo(server);

// API endpoints
app.post('/api/post', upload.single('photo'), async (req, res) => {
    const { user_address } = req.body;
    const photoUrl = req.file ? '/uploads/' + req.file.filename : null; // Get photo URL if uploaded

    // Insert post into database with likeNum initialized to 0
    await db.run('INSERT INTO posts (user_address, photo_url, likeNum) VALUES (?, ?, ?)',
        [user_address, photoUrl, 0], // Initialize likeNum to 0
        function(err) {
            if (err) {
                console.error('Error inserting post:', err);
                res.status(500).json({ error: 'Internal server error' });
            } else {
                console.log('Post inserted into database');
                res.status(200).json({ message: 'Post created successfully' });
            }
        }
    );
    await action_givePostReward(user_address);
});

app.get('/api/balance', async (req, res) => {
    try{
        const { user_address } = req.query
        const balance = await getBalance(user_address);
        console.log(balance)
        res.status(200).json({balance: balance.toString()})
    } catch(e) {
        res.status(500)
    }
})

app.get('/api/posts', (req, res) => {
    // Fetch all posts from database
    console.log("call api posts")
    db.all('SELECT * FROM posts', (err, rows) => {
        if (err) {
            console.error('Error fetching posts:', err);
            res.status(500).json({ error: 'Internal server error' });
        } else {
            res.json(rows);
        }
    });
});

//get like num
app.get('/api/likeNum', (req, res) => {
    const { user_address } = req.query;

    // Retrieve likeNum for the specified user_address
    db.get('SELECT likeNum FROM posts WHERE user_address = ?',
        [user_address],
        function(err, row) {
            if (err) {
                console.error('Error retrieving likeNum:', err);
                res.status(500).json({ error: 'Internal server error' });
            } else if (!row) {
                res.status(404).json({ error: 'Post not found' });
            } else {
                const likeNum = row.likeNum;
                console.log(`likeNum retrieved for post with user_address ${user_address}: ${likeNum}`);
                res.status(200).json({ likeNum: likeNum });
            }
        }
    );
})

// when someone like a post
app.post('/api/like', async (req, res) => {
    const { num, to } = req.body
    console.log(num, to)
    db.run('UPDATE posts SET likeNum = likeNum + ? WHERE user_address = ?',
        [num, to],
        function(err) {
            if (err) {
                console.error('Error updating likeNum:', err);
                res.status(500).json({ error: 'Internal server error' });
            } else {
                console.log(`likeNum updated for post with user_address ${to}`);
                res.status(200).json({ message: 'Like updated successfully' });
            }
        }
    );
})

// Socket.IO connection handling
io.on('connection', (socket) => {
    console.log('Client connected');

    socket.on('disconnect', () => {
        console.log('Client disconnected');
    });
});

const port = process.env.PORT;
server.listen(port, () => {
    console.log(`Server running on port ${port}`);
});

