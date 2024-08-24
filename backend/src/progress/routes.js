const express = require('express');
const router = express.Router();
const Progress = require('../models/Progress');
const Achievement = require('../models/Achievement');
const authenticate = require('../auth/middleware');

// Update course progress
router.post('/update-progress', authenticate, async (req, res) => {
    const { courseId, completionPercentage, milestones } = req.body;

    try {
        let progress = await Progress.findOne({ user: req.user.id, course: courseId });
        if (!progress) {
            progress = new Progress({
                user: req.user.id,
                course: courseId,
                completionPercentage,
                milestonesReached: milestones || [],
            });
        } else {
            progress.completionPercentage = completionPercentage;
            if (milestones) {
                progress.milestonesReached.push(...milestones);
            }
            progress.lastUpdated = Date.now();
        }
        await progress.save();

        res.status(201).json(progress);
    } catch (error) {
        console.error('Error updating progress:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

// Award an achievement
router.post('/award-achievement', authenticate, async (req, res) => {
    const { title, description } = req.body;

    try {
        const achievement = new Achievement({
            user: req.user.id,
            title,
            description,
        });
        await achievement.save();

        res.status(201).json(achievement);
    } catch (error) {
        console.error('Error awarding achievement:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

// Get user progress
router.get('/user/:userId/progress', authenticate, async (req, res) => {
    try {
        const progress = await Progress.find({ user: req.params.userId }).populate('course', 'title');
        res.json(progress);
    } catch (error) {
        console.error('Error retrieving progress:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

// Get user achievements
router.get('/user/:userId/achievements', authenticate, async (req, res) => {
    try {
        const achievements = await Achievement.find({ user: req.params.userId });
        res.json(achievements);
    } catch (error) {
        console.error('Error retrieving achievements:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;
