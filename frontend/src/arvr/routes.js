const express = require('express');
const router = express.Router();
const ARVRContent = require('../models/ARVRContent');
const authenticate = require('../auth/middleware');

// Create AR/VR content
router.post('/create', authenticate, async (req, res) => {
    const { courseId, moduleId, title, description, contentURL, contentType } = req.body;

    try {
        const arvrContent = new ARVRContent({
            course: courseId,
            module: moduleId,
            title,
            description,
            contentURL,
            contentType,
        });
        await arvrContent.save();

        res.status(201).json(arvrContent);
    } catch (error) {
        console.error('Error creating AR/VR content:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

// Get AR/VR content for a module
router.get('/module/:moduleId', authenticate, async (req, res) => {
    try {
        const content = await ARVRContent.find({ module: req.params.moduleId });
        res.json(content);
    } catch (error) {
        console.error('Error retrieving AR/VR content:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;
