// scheduler.js
const schedule = require('node-schedule');
const io = require('./socket'); // Import socket.io instance
const question = require('./questions'); 

const job_take_photo = schedule.scheduleJob(generateRandomTime(), function() {
    const randomIndex = Math.floor(Math.random() * questions.length);
    const randomQuestion = questions[randomIndex].question;

    const randomTime = new Date();

    io.emit('time to take photo', { question: randomQuestion });

    console.log('Notification sent at', randomTime, ' question:', randomQuestion);

    action_open();
    // Schedule the next job for the next day
    job_take_photo.reschedule(generateRandomTime());
});

const job_Tally = schedule.scheduleJob("0 0 0 * * *", async function() {
    await action_tally();
})

function generateRandomTime() {
    //TODO: change back to random

    // const randomHour = Math.floor(Math.random() * 24); // Generate random hour (0-23)
    // const randomMinute = Math.floor(Math.random() * 60); // Generate random minute (0-59)
    // const randomSecond = Math.floor(Math.random() * 60); // Generate random second (0-59)

    // const randomTime = `${randomSecond} ${randomMinute} ${randomHour} * * *`;
    // return randomTime;
    return `0 0 0 * * *` //for testing
}




