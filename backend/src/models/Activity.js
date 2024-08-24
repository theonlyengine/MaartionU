const mongoose = require('mongoose');

const activitySchema = new mongoose.Schema({
    module: { type: mongoose.Schema.Types.ObjectId, ref: 'InteractiveModule', required: true },
    type: { type: String, enum: ['quiz', 'simulation', 'exercise'], required: true },
    title: { type: String, required: true },
    content: { type: mongoose.Schema.Types.Mixed, required: true }, // Flexible schema for different activity types
    createdAt: { type: Date, default: Date.now },
});

const Activity = mongoose.model('Activity', activitySchema);
module.exports = Activity;
