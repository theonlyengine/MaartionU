const mongoose = require('mongoose');

const badgeSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    name: { type: String, required: true },
    description: { type: String, required: true },
    earnedAt: { type: Date, default: Date.now },
});

const Badge = mongoose.model('Badge', badgeSchema);
module.exports = Badge;
