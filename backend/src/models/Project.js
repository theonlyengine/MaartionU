const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    members: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }],
    course: { type: mongoose.Schema.Types.ObjectId, ref: 'Course', required: true },
    createdAt: { type: Date, default: Date.now },
    dueDate: { type: Date },
});

const Project = mongoose.model('Project', projectSchema);
module.exports = Project;
