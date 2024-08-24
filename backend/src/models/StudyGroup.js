const mongoose = require('mongoose');

const studyGroupSchema = new mongoose.Schema({
    course: { type: mongoose.Schema.Types.ObjectId, ref: 'Course', required: true },
    title: { type: String, required: true },
    members: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    createdAt: { type: Date, default: Date.now },
});

const StudyGroup = mongoose.model('StudyGroup', studyGroupSchema);
module.exports = StudyGroup;
