const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const schedule = require('node-schedule');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

// Schedule a random notification
const job = schedule.scheduleJob('0 0 * * *', function() {
  const randomHour = Math.floor(Math.random() * 24); // Generate random hour (0-23)
  const randomMinute = Math.floor(Math.random() * 60); // Generate random minute (0-59)

  const randomTime = new Date();
  randomTime.setHours(randomHour, randomMinute, 0, 0);

  io.emit('time to take photo', { time: randomTime });

  console.log('Notification sent at', randomTime);
})

io.on('connection', (socket) => {
    console.log('Client connected');
    
    socket.on('disconnect', () => {
        console.log('Client disconnected');
    });
});


server.listen(3000, () => {
    console.log('Server running on port 3000');
});
