const express = require('express');
const router = express.Router();
const RecommendationService = require('../services/RecommendationService');
const authenticate = require('../auth/middleware');

// Get personalized content recommendations
router.get('/recommendations', authenticate, async (req, res) => {
    try {
        const recommendations = await RecommendationService.generateRecommendations(req.user.id);
        res.json(recommendations);
    } catch (error) {
        console.error('Error generating recommendations:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;
