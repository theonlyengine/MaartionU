const mongoose = require('mongoose');

const groupProjectSchema = new mongoose.Schema({
    course: { type: mongoose.Schema.Types.ObjectId, ref: 'Course', required: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
    groupMembers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }],
    submission: { type: String }, // URL or file path to submitted project
    submissionDate: { type: Date },
    feedback: { type: String }, // Feedback from instructors
    grade: { type: Number }, // Optional grade for the project
    createdAt: { type: Date, default: Date.now },
});

const GroupProject = mongoose.model('GroupProject', groupProjectSchema);
module.exports = GroupProject;
