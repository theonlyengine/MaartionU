const mongoose = require('mongoose');

const analyticsSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    action: { type: String, required: true }, // Example: 'completed_course', 'viewed_content'
    contentId: { type: mongoose.Schema.Types.ObjectId, ref: 'Content' }, // Optional: Linked content or course
    timestamp: { type: Date, default: Date.now },
    details: { type: mongoose.Schema.Types.Mixed }, // Flexible schema for additional details
});

const Analytics = mongoose.model('Analytics', analyticsSchema);
module.exports = Analytics;
