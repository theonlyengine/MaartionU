const mongoose = require('mongoose');

const videoSessionSchema = new mongoose.Schema({
    course: { type: mongoose.Schema.Types.ObjectId, ref: 'Course', required: true },
    host: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    participants: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }],
    startTime: { type: Date, required: true },
    endTime: { type: Date },
    createdAt: { type: Date, default: Date.now },
});

const VideoSession = mongoose.model('VideoSession', videoSessionSchema);
module.exports = VideoSession;
