const mongoose = require('mongoose');

const userActivitySchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    course: { type: mongoose.Schema.Types.ObjectId, ref: 'Course', required: true },
    module: { type: mongoose.Schema.Types.ObjectId, ref: 'Module', required: true },
    activityType: { type: String, required: true }, // e.g., "video_watched", "quiz_taken"
    timestamp: { type: Date, default: Date.now },
    duration: { type: Number }, // Duration spent on the activity
    additionalData: { type: Map, of: String }, // Any additional data points
});

const UserActivity = mongoose.model('UserActivity', userActivitySchema);
module.exports = UserActivity;
