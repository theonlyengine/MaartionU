const express = require('express');
const router = express.Router();
const InteractiveModule = require('../models/InteractiveModule');
const Activity = require('../models/Activity');
const authenticate = require('../auth/middleware');

// Create a new interactive module
router.post('/create-module', authenticate, async (req, res) => {
    const { title, description, courseId } = req.body;

    try {
        const module = new InteractiveModule({
            title,
            description,
            course: courseId,
        });
        await module.save();

        res.status(201).json(module);
    } catch (error) {
        console.error('Error creating module:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

// Add an activity to a module
router.post('/add-activity', authenticate, async (req, res) => {
    const { moduleId, type, title, content } = req.body;

    try {
        const activity = new Activity({
            module: moduleId,
            type,
            title,
            content,
        });
        await activity.save();

        const module = await InteractiveModule.findById(moduleId);
        module.activities.push(activity._id);
        await module.save();

        res.status(201).json(activity);
    } catch (error) {
        console.error('Error adding activity:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

// Get modules for a course
router.get('/course/:courseId/modules', authenticate, async (req, res) => {
    try {
        const modules = await InteractiveModule.find({ course: req.params.courseId }).populate('activities');
        res.json(modules);
    } catch (error) {
        console.error('Error retrieving modules:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

// Get activities for a module
router.get('/module/:moduleId/activities', authenticate, async (req, res) => {
    try {
        const activities = await Activity.find({ module: req.params.moduleId });
        res.json(activities);
    } catch (error) {
        console.error('Error retrieving activities:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;
