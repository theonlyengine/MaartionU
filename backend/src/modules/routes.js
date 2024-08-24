const express = require('express');
const router = express.Router();
const MicroModule = require('../models/MicroModule');
const authenticate = require('../auth/middleware');

// Create a new micro-module
router.post('/create', authenticate, async (req, res) => {
    const { courseId, title, description, content, duration, order } = req.body;

    try {
        const microModule = new MicroModule({
            course: courseId,
            title,
            description,
            content,
            duration,
            order,
        });
        await microModule.save();

        res.status(201).json(microModule);
    } catch (error) {
        console.error('Error creating micro-module:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

// Get all micro-modules for a course
router.get('/course/:courseId', authenticate, async (req, res) => {
    try {
        const modules = await MicroModule.find({ course: req.params.courseId }).sort({ order: 1 });
        res.json(modules);
    } catch (error) {
        console.error('Error retrieving micro-modules:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;
