const express = require('express');
const router = express.Router();
const User = require('../models/User');
const authenticate = require('../auth/middleware');

// Update accessibility preferences
router.post('/update-preferences', authenticate, async (req, res) => {
    const { language, fontSize, colorContrast } = req.body;

    try {
        const user = await User.findById(req.user.id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        user.accessibilityPreferences.language = language || user.accessibilityPreferences.language;
        user.accessibilityPreferences.fontSize = fontSize || user.accessibilityPreferences.fontSize;
        user.accessibilityPreferences.colorContrast = colorContrast || user.accessibilityPreferences.colorContrast;

        await user.save();
        res.json(user.accessibilityPreferences);
    } catch (error) {
        console.error('Error updating accessibility preferences:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

// Get user accessibility preferences
router.get('/preferences', authenticate, async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('accessibilityPreferences');
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.json(user.accessibilityPreferences);
    } catch (error) {
        console.error('Error retrieving accessibility preferences:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;
