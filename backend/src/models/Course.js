const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    teacher: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    videos: [{ type: String }], // URLs of uploaded videos
    liveSessions: [{ 
        title: String,
        scheduledTime: Date,
        link: String // Link to the live session
    }],
    createdAt: { type: Date, default: Date.now },
});

const Course = mongoose.model('Course', courseSchema);
module.exports = Course;
