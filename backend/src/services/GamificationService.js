const { Badge, Points, Leaderboard } = require('../models/Gamification');
const User = require('../models/User');

class GamificationService {
    static async awardBadge(userId, badgeName) {
        const badge = await Badge.findOne({ name: badgeName });
        if (!badge) throw new Error('Badge not found');

        // Add badge to user's collection (assuming a user has a badges field)
        const user = await User.findById(userId);
        if (!user.badges.includes(badge._id)) {
            user.badges.push(badge._id);
            await user.save();
        }

        return badge;
    }

    static async addPoints(userId, points) {
        let userPoints = await Points.findOne({ user: userId });
        if (!userPoints) {
            userPoints = new Points({ user: userId, points });
        } else {
            userPoints.points += points;
        }
        await userPoints.save();

        // Update leaderboard
        let leaderboardEntry = await Leaderboard.findOne({ user: userId });
        if (!leaderboardEntry) {
            leaderboardEntry = new Leaderboard({ user: userId, totalPoints: userPoints.points });
        } else {
            leaderboardEntry.totalPoints = userPoints.points;
        }
        await leaderboardEntry.save();

        return userPoints;
    }

    static async getLeaderboard() {
        return await Leaderboard.find().sort({ totalPoints: -1 }).populate('user').limit(10);
    }
}

module.exports = GamificationService;
