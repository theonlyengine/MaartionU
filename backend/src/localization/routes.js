const express = require('express');
const router = express.Router();
const LocalizationService = require('../services/LocalizationService');
const authenticate = require('../auth/middleware');

const localizationService = new LocalizationService(process.env.TRANSLATOR_API_KEY);

// Translate text to the user's preferred language
router.post('/translate', authenticate, async (req, res) => {
    const { text, targetLanguage } = req.body;

    try {
        const translatedText = await localizationService.translate(text, targetLanguage);
        res.status(200).json({ translatedText });
    } catch (error) {
        console.error('Error translating text:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;
