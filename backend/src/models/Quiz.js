const mongoose = require('mongoose');

const quizSchema = new mongoose.Schema({
    course: { type: mongoose.Schema.Types.ObjectId, ref: 'Course', required: true },
    title: { type: String, required: true },
    questions: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Question' }],
    createdAt: { type: Date, default: Date.now },
});

const Quiz = mongoose.model('Quiz', quizSchema);
module.exports = Quiz;
