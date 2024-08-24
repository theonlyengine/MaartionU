const express = require('express');
const router = express.Router();
const authenticate = require('../auth/middleware');

router.post('/feedback', authenticate, async (req, res) => {
    const { feedback } = req.body;
    try {
        // Store feedback in database or send to a notification channel
        res.json({ message: 'Feedback received' });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;
