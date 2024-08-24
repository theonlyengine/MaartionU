const mongoose = require('mongoose');

const adaptiveLearningSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    course: { type: mongoose.Schema.Types.ObjectId, ref: 'Course', required: true },
    currentDifficulty: { type: String, enum: ['easy', 'medium', 'hard'], default: 'medium' }, // Tracks current difficulty level
    performanceHistory: [{ 
        session: { type: mongoose.Schema.Types.ObjectId, ref: 'StudySession' },
        performance: { type: Number, required: true },  // Performance score for that session
    }],
    recommendedContent: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Content' }],  // Next content recommendations
    lastUpdated: { type: Date, default: Date.now },
});

const AdaptiveLearning = mongoose.model('AdaptiveLearning', adaptiveLearningSchema);
module.exports = AdaptiveLearning;
