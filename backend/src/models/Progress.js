const mongoose = require('mongoose');

const progressSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    course: { type: mongoose.Schema.Types.ObjectId, ref: 'Course', required: true },
    completionPercentage: { type: Number, required: true, default: 0 },
    milestonesReached: [{ type: String }], // Stores milestones as an array of strings
    lastUpdated: { type: Date, default: Date.now },
});

const Progress = mongoose.model('Progress', progressSchema);
module.exports = Progress;
