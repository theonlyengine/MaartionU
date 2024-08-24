const mongoose = require('mongoose');

const studyPlanSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    title: { type: String, required: true },
    goals: [{ type: String, required: true }],  // User-defined goals
    recommendedCourses: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Course' }],  // AI-recommended courses
    recommendedActivities: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Activity' }],  // AI-recommended activities
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
});

const StudyPlan = mongoose.model('StudyPlan', studyPlanSchema);
module.exports = StudyPlan;
