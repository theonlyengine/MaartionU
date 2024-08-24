const mongoose = require('mongoose');

const assessmentSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    course: { type: mongoose.Schema.Types.ObjectId, ref: 'Course', required: true },
    feedback: { type: String, required: true },
    score: { type: Number, required: true },
    date: { type: Date, default: Date.now },
});

const Assessment = mongoose.model('Assessment', assessmentSchema);
module.exports = Assessment;
