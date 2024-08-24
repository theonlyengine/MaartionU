const express = require('express');
const router = express.Router();
const AnalyticsReport = require('../models/AnalyticsReport');
const UserProgress = require('../models/UserProgress');
const UserActivity = require('../models/UserActivity');
const authenticate = require('../auth/middleware');

// Generate a progress report
router.post('/generate-progress-report', authenticate, async (req, res) => {
    const { courseId } = req.body;

    try {
        const progressData = await UserProgress.find({ course: courseId });

        const reportData = progressData.map(progress => ({
            userId: progress.user,
            progressPercentage: progress.progressPercentage,
            lastAccessed: progress.lastAccessed,
            quizScores: progress.quizScores,
        }));

        const report = new AnalyticsReport({
            course: courseId,
            generatedBy: req.user.id,
            reportType: 'progress',
            data: reportData,
        });

        await report.save();
        res.status(201).json(report);
    } catch (error) {
        console.error('Error generating progress report:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

// Generate a performance report
router.post('/generate-performance-report', authenticate, async (req, res) => {
    const { courseId } = req.body;

    try {
        const activityData = await UserActivity.find({ course: courseId });

        const reportData = activityData.map(activity => ({
            userId: activity.user,
            activityType: activity.activityType,
            duration: activity.duration,
            timestamp: activity.timestamp,
        }));

        const report = new AnalyticsReport({
            course: courseId,
            generatedBy: req.user.id,
            reportType: 'performance',
            data: reportData,
        });

        await report.save();
        res.status(201).json(report);
    } catch (error) {
        console.error('Error generating performance report:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

// Retrieve reports
router.get('/course/:courseId/reports', authenticate, async (req, res) => {
    try {
        const reports = await AnalyticsReport.find({ course: req.params.courseId });
        res.json(reports);
    } catch (error) {
        console.error('Error retrieving reports:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;
