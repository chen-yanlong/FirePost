// database.js

const sqlite3 = require('sqlite3').verbose();

export const db = new sqlite3.Database(':memory:');
db.serialize(() => {
    db.run(`CREATE TABLE IF NOT EXISTS posts (
        id INTEGER PRIMARY KEY, 
        user_address TEXT,
        photo_url TEXT,
        likeNum INTEGER DEFAULT 0,  -- Initialize likeNum to 0
        timestamp DATETIME DEFAULT CURRENT_TIMESTAMP
    )`);
});

