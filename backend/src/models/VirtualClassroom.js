const mongoose = require('mongoose');

const virtualClassroomSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    instructor: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    scheduledTime: { type: Date, required: true },
    duration: { type: Number, required: true },  // Duration in minutes
    createdAt: { type: Date, default: Date.now },
});

const VirtualClassroom = mongoose.model('VirtualClassroom', virtualClassroomSchema);
module.exports = VirtualClassroom;
