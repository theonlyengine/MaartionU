const mongoose = require('mongoose');

const badgeSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    iconUrl: { type: String, required: true },  // URL to the badge icon
    criteria: { type: String, required: true },  // Criteria for earning the badge
});

const pointsSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    points: { type: Number, default: 0 },
});

const leaderboardSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    totalPoints: { type: Number, default: 0 },
});

const Badge = mongoose.model('Badge', badgeSchema);
const Points = mongoose.model('Points', pointsSchema);
const Leaderboard = mongoose.model('Leaderboard', leaderboardSchema);

module.exports = { Badge, Points, Leaderboard };
