const express = require('express');
const router = express.Router();
const UserPreferences = require('../models/UserPreferences');
const AIAssistantService = require('../services/AIAssistantService');
const authenticate = require('../auth/middleware');

// Get personalized recommendations
router.get('/recommendations', authenticate, async (req, res) => {
    try {
        const userPreferences = await UserPreferences.findOne({ user: req.user.id });
        const recommendations = await AIAssistantService.generateRecommendation(userPreferences, userPreferences.interactionHistory);

        res.json({ recommendations });
    } catch (error) {
        console.error('Error generating recommendations:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

// Ask the AI assistant a question
router.post('/ask', authenticate, async (req, res) => {
    const { question } = req.body;

    try {
        const answer = await AIAssistantService.answerQuestion(question);
        res.json({ answer });
    } catch (error) {
        console.error('Error answering question:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;
