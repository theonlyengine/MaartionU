const express = require('express');
const router = express.Router();
const ChatbotService = require('../services/ChatbotService');
const authenticate = require('../auth/middleware');

const chatbotService = new ChatbotService();

// Ask the chatbot a question
router.post('/ask', authenticate, async (req, res) => {
    const { question } = req.body;

    try {
        const answer = await chatbotService.askQuestion(question);
        res.status(200).json({ answer });
    } catch (error) {
        console.error('Error interacting with chatbot:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;
