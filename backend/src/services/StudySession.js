const mongoose = require('mongoose');

const studySessionSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    studyPlan: { type: mongoose.Schema.Types.ObjectId, ref: 'StudyPlan', required: true },
    course: { type: mongoose.Schema.Types.ObjectId, ref: 'Course', required: true },
    activity: { type: mongoose.Schema.Types.ObjectId, ref: 'Activity' },
    startTime: { type: Date, default: Date.now },
    endTime: { type: Date },
    progress: { type: Number, required: true },  // Percentage of completion
});

const StudySession = mongoose.model('StudySession', studySessionSchema);
module.exports = StudySession;
