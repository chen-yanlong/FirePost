// scheduler.js
const schedule = require('node-schedule');
const io = require('./socket'); // Import socket.io instance
const question = require('./questions');

// Schedule a random notification
const job = schedule.scheduleJob('0 0 * * *', function() {
    const randomHour = Math.floor(Math.random() * 24); // Generate random hour (0-23)
    const randomMinute = Math.floor(Math.random() * 60); // Generate random minute (0-59)

    const randomIndex = Math.floor(Math.random() * questions.length);
    const randomQuestion = questions[randomIndex].question;

    const randomTime = new Date();
    randomTime.setHours(randomHour, randomMinute, 0, 0);

    io.emit('time to take photo', { time: randomTime, question: randomQuestion });

    console.log('Notification sent at', randomTime, ' question:', randomQuestion);
});
