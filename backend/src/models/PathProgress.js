const mongoose = require('mongoose');

const pathProgressSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    learningPath: { type: mongoose.Schema.Types.ObjectId, ref: 'LearningPath', required: true },
    completedCourses: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Course' }],
    currentCourse: { type: mongoose.Schema.Types.ObjectId, ref: 'Course' },
    startedAt: { type: Date, default: Date.now },
    completedAt: { type: Date },
});

const PathProgress = mongoose.model('PathProgress', pathProgressSchema);
module.exports = PathProgress;
