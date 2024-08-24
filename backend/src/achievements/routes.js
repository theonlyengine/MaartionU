const express = require('express');
const router = express.Router();
const UserAchievement = require('../models/UserAchievement');
const Badge = require('../models/Badge');
const Leaderboard = require('../models/Leaderboard');
const authenticate = require('../auth/middleware');

// Award a badge to a user
router.post('/award-badge', authenticate, async (req, res) => {
    const { badgeId } = req.body;

    try {
        let achievement = await UserAchievement.findOne({ user: req.user.id });
        if (!achievement) {
            achievement = new UserAchievement({ user: req.user.id, badges: [], points: 0 });
        }
        achievement.badges.push(badgeId);
        await achievement.save();

        res.status(201).json(achievement);
    } catch (error) {
        console.error('Error awarding badge:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

// Update points for a user
router.post('/update-points', authenticate, async (req, res) => {
    const { points } = req.body;

    try {
        let achievement = await UserAchievement.findOne({ user: req.user.id });
        if (!achievement) {
            achievement = new UserAchievement({ user: req.user.id, badges: [], points: 0 });
        }
        achievement.points += points;
        await achievement.save();

        // Update leaderboard
        let leaderboard = await Leaderboard.findOne({ user: req.user.id });
        if (!leaderboard) {
            leaderboard = new Leaderboard({ user: req.user.id, points: 0 });
        }
        leaderboard.points = achievement.points;
        await leaderboard.save();

        res.status(201).json(achievement);
    } catch (error) {
        console.error('Error updating points:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

// Get leaderboard
router.get('/leaderboard', authenticate, async (req, res) => {
    try {
        const leaderboard = await Leaderboard.find().sort({ points: -1 }).limit(10).populate('user', 'name');
        res.json(leaderboard);
    } catch (error) {
        console.error('Error retrieving leaderboard:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;
