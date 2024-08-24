const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema({
    quiz: { type: mongoose.Schema.Types.ObjectId, ref: 'Quiz', required: true },
    text: { type: String, required: true },
    options: [{ text: String, isCorrect: Boolean }],
    difficulty: { type: String, enum: ['easy', 'medium', 'hard'], default: 'medium' },
    createdAt: { type: Date, default: Date.now },
});

const Question = mongoose.model('Question', questionSchema);
module.exports = Question;
