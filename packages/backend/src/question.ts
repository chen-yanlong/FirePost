const fs = require('fs');
const path = require('path');

const questionsFilePath = path.join(__dirname, './src/questions.json');
export const questions = JSON.parse(fs.readFileSync(questionsFilePath, 'utf-8'));


