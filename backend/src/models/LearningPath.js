const mongoose = require('mongoose');

const learningPathSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    courses: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Course' }], // List of courses in the path
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    createdAt: { type: Date, default: Date.now },
});

const LearningPath = mongoose.model('LearningPath', learningPathSchema);
module.exports = LearningPath;
