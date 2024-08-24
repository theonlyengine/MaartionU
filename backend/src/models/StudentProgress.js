const mongoose = require('mongoose');

const studentProgressSchema = new mongoose.Schema({
    student: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    course: { type: mongoose.Schema.Types.ObjectId, ref: 'Course', required: true },
    module: { type: mongoose.Schema.Types.ObjectId, ref: 'Module', required: true }, // Assuming each course has modules
    progressPercentage: { type: Number, required: true, default: 0 },
    lastAccessed: { type: Date, default: Date.now },
});

const StudentProgress = mongoose.model('StudentProgress', studentProgressSchema);
module.exports = StudentProgress;
