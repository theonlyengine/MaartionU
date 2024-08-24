const mongoose = require('mongoose');

const liveSessionSchema = new mongoose.Schema({
    classroom: { type: mongoose.Schema.Types.ObjectId, ref: 'VirtualClassroom', required: true },
    instructor: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    startTime: { type: Date, default: Date.now },
    endTime: { type: Date },
    recordingUrl: { type: String },  // URL to the recorded session
    createdAt: { type: Date, default: Date.now },
});

const LiveSession = mongoose.model('LiveSession', liveSessionSchema);
module.exports = LiveSession;
