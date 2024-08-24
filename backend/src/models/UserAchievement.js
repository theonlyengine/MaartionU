const mongoose = require('mongoose');

const userAchievementSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    badges: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Badge' }],
    points: { type: Number, default: 0 },
});

const UserAchievement = mongoose.model('UserAchievement', userAchievementSchema);
module.exports = UserAchievement;
