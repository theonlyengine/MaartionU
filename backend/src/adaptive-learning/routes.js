const express = require('express');
const router = express.Router();
const AdaptiveLearningService = require('../services/AdaptiveLearningService');
const authenticate = require('../auth/middleware');

// Update performance and adapt learning path
router.post('/update-performance', authenticate, async (req, res) => {
    const { courseId, sessionId, performance } = req.body;

    try {
        const adaptiveLearning = await AdaptiveLearningService.updatePerformance(req.user.id, courseId, sessionId, performance);
        res.status(200).json(adaptiveLearning);
    } catch (error) {
        console.error('Error updating performance:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

// Get recommended content
router.get('/recommended-content', authenticate, async (req, res) => {
    const { courseId } = req.query;

    try {
        const recommendedContent = await AdaptiveLearningService.getRecommendedContent(req.user.id, courseId);
        res.status(200).json(recommendedContent);
    } catch (error) {
        console.error('Error fetching recommended content:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;
