const mongoose = require('mongoose');

const achievementSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
    awardedAt: { type: Date, default: Date.now },
});

const Achievement = mongoose.model('Achievement', achievementSchema);
module.exports = Achievement;
