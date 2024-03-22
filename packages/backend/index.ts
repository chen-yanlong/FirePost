// Import required modules
const express = require('express');
const { Pool } = require('pg');
require('dotenv').config();

// Initialize Express app
const app = express();

// Middleware
app.use(express.json()); // Parse JSON bodies

// Create a PostgreSQL pool
const pool = new Pool({
  connectionString: process.env.DB_URI,
});

// Define routes
app.get('/', async (req, res) => {
  try {
    const client = await pool.connect();
    const result = await client.query('SELECT $1::text as message', ['Hello, world!']);
    const message = result.rows[0].message;
    client.release();
    res.send(message);
  } catch (err) {
    console.error('Error executing query:', err);
    res.status(500).send('Internal Server Error');
  }
});

// Start the server
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
