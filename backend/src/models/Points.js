const mongoose = require('mongoose');

const pointsSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    course: { type: mongoose.Schema.Types.ObjectId, ref: 'Course', required: true },
    points: { type: Number, default: 0 },
    lastEarned: { type: Date, default: Date.now },
});

const Points = mongoose.model('Points', pointsSchema);
module.exports = Points;
