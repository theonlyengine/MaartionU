const mongoose = require('mongoose');

const courseFeedbackSchema = new mongoose.Schema({
    student: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    course: { type: mongoose.Schema.Types.ObjectId, ref: 'Course', required: true },
    rating: { type: Number, required: true, min: 1, max: 5 },
    feedback: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
});

const CourseFeedback = mongoose.model('CourseFeedback', courseFeedbackSchema);
module.exports = CourseFeedback;
