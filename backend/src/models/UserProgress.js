const mongoose = require('mongoose');

const userProgressSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    course: { type: mongoose.Schema.Types.ObjectId, ref: 'Course', required: true },
    module: { type: mongoose.Schema.Types.ObjectId, ref: 'Module', required: true },
    progressPercentage: { type: Number, required: true, default: 0 },
    lastAccessed: { type: Date, default: Date.now },
    quizScores: [{
        quiz: { type: mongoose.Schema.Types.ObjectId, ref: 'Quiz' },
        score: { type: Number },
        dateTaken: { type: Date, default: Date.now }
    }],
    recommendations: [{ type: String }],
    feedback: [{ type: String }], // Personalized feedback provided to the user
    assessments: [{ // Continuous assessment data
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Assessment',
    }],
});

const UserProgress = mongoose.model('UserProgress', userProgressSchema);
module.exports = UserProgress;
