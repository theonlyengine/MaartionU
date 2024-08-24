const express = require('express');
const router = express.Router();
const UserActivity = require('../models/UserActivity');
const UserProgress = require('../models/UserProgress');
const AnalyticsService = require('../services/AnalyticsService');
const authenticate = require('../auth/middleware');

// Log user activity
router.post('/log-activity', authenticate, async (req, res) => {
    const { courseId, moduleId, activityType, duration, additionalData } = req.body;

    try {
        const activity = new UserActivity({
            user: req.user.id,
            course: courseId,
            module: moduleId,
            activityType,
            duration,
            additionalData,
        });
        await activity.save();

        res.status(201).json(activity);
    } catch (error) {
        console.error('Error logging activity:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

// Retrieve analytics data for a course
router.get('/course/:courseId', authenticate, async (req, res) => {
    try {
        const activities = await UserActivity.find({ course: req.params.courseId });
        const progressData = await UserProgress.find({ course: req.params.courseId });

        // Aggregate data
        const totalUsers = new Set(activities.map(activity => activity.user.toString())).size;
        const totalActivities = activities.length;
        const averageProgress = (progressData.reduce((acc, cur) => acc + cur.progressPercentage, 0) / progressData.length).toFixed(2);

        const analytics = {
            totalUsers,
            totalActivities,
            averageProgress,
            activitiesByType: activities.reduce((acc, cur) => {
                acc[cur.activityType] = (acc[cur.activityType] || 0) + 1;
                return acc;
            }, {}),
        };

        res.json(analytics);
    } catch (error) {
        console.error('Error retrieving analytics:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

// Log an analytics action
router.post('/log-action', authenticate, async (req, res) => {
    const { action, contentId, details } = req.body;

    try {
        await AnalyticsService.logAction(req.user.id, action, contentId, details);
        res.status(201).json({ message: 'Action logged successfully' });
    } catch (error) {
        console.error('Error logging action:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

// Generate user-specific report
router.get('/user-report', authenticate, async (req, res) => {
    const { startDate, endDate } = req.query;

    try {
        const report = await AnalyticsService.generateReport(req.user.id, new Date(startDate), new Date(endDate));
        res.json(report);
    } catch (error) {
        console.error('Error generating report:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

// Generate global report (Admin only)
router.get('/global-report', authenticate, async (req, res) => {
    const { startDate, endDate } = req.query;

    try {
        const report = await AnalyticsService.generateGlobalReport(new Date(startDate), new Date(endDate));
        res.json(report);
    } catch (error) {
        console.error('Error generating global report:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;
