// database.js

const sqlite3 = require('sqlite3').verbose();

const db = new sqlite3.Database(':memory:');
db.serialize(() => {
    db.run(`CREATE TABLE IF NOT EXISTS posts (
        id INTEGER PRIMARY KEY, 
        userId TEXT,  
        timestamp DATETIME DEFAULT CURRENT_TIMESTAMP
    )`);
});

module.exports = db;
