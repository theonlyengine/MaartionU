const express = require('express');
const router = express.Router();
const Badge = require('../models/Badge');
const UserPoints = require('../models/UserPoints');
const Leaderboard = require('../models/Leaderboard');
const authenticate = require('../auth/middleware');
const GamificationService = require('../services/GamificationService');

// Earn points for an action
router.post('/earn-points', authenticate, async (req, res) => {
    const { points } = req.body;

    try {
        let userPoints = await UserPoints.findOne({ user: req.user.id });
        if (!userPoints) {
            userPoints = new UserPoints({ user: req.user.id, points });
        } else {
            userPoints.points += points;
            userPoints.lastUpdated = Date.now();
        }
        await userPoints.save();

        // Update leaderboard
        let leaderboardEntry = await Leaderboard.findOne({ user: req.user.id });
        if (!leaderboardEntry) {
            leaderboardEntry = new Leaderboard({ user: req.user.id, points: userPoints.points, rank: 0 });
        } else {
            leaderboardEntry.points = userPoints.points;
        }
        await leaderboardEntry.save();

        res.status(201).json(userPoints);
    } catch (error) {
        console.error('Error earning points:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

// Award a badge to a user
router.post('/award-badge', authenticate, async (req, res) => {
    const { title, description, iconUrl, criteria } = req.body;

    try {
        const badge = new Badge({
            title,
            description,
            iconUrl,
            criteria,
        });
        await badge.save();

        res.status(201).json(badge);
    } catch (error) {
        console.error('Error awarding badge:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

// Add points to a user
router.post('/add-points', authenticate, async (req, res) => {
    const { points } = req.body;

    try {
        const userPoints = await GamificationService.addPoints(req.user.id, points);
        res.status(201).json(userPoints);
    } catch (error) {
        console.error('Error adding points:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

// Get user's badges and points
router.get('/user-gamification', authenticate, async (req, res) => {
    try {
        const points = await UserPoints.findOne({ user: req.user.id });
        const badges = await Badge.find({ user: req.user.id });

        res.json({ points, badges });
    } catch (error) {
        console.error('Error retrieving user gamification data:', error);
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
