const express = require('express');
const router = express.Router();
const LearningPath = require('../models/LearningPath');
const PathProgress = require('../models/PathProgress');
const authenticate = require('../auth/middleware');

// Create a new learning path
router.post('/create-path', authenticate, async (req, res) => {
    const { title, description, courseIds } = req.body;

    try {
        const learningPath = new LearningPath({
            title,
            description,
            courses: courseIds,
            createdBy: req.user.id,
        });
        await learningPath.save();

        res.status(201).json(learningPath);
    } catch (error) {
        console.error('Error creating learning path:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

// Enroll in a learning path
router.post('/enroll', authenticate, async (req, res) => {
    const { pathId } = req.body;

    try {
        const pathProgress = new PathProgress({
            user: req.user.id,
            learningPath: pathId,
            currentCourse: null, // Initially, no course is started
        });
        await pathProgress.save();

        res.status(201).json(pathProgress);
    } catch (error) {
        console.error('Error enrolling in learning path:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

// Update learning path progress
router.post('/update-progress', authenticate, async (req, res) => {
    const { pathId, completedCourseId } = req.body;

    try {
        const pathProgress = await PathProgress.findOne({ user: req.user.id, learningPath: pathId });
        if (!pathProgress) {
            return res.status(404).json({ message: 'Learning path not found' });
        }

        pathProgress.completedCourses.push(completedCourseId);

        const nextCourseIndex = pathProgress.learningPath.courses.indexOf(completedCourseId) + 1;
        if (nextCourseIndex < pathProgress.learningPath.courses.length) {
            pathProgress.currentCourse = pathProgress.learningPath.courses[nextCourseIndex];
        } else {
            pathProgress.currentCourse = null;
            pathProgress.completedAt = Date.now();
        }

        await pathProgress.save();

        res.status(200).json(pathProgress);
    } catch (error) {
        console.error('Error updating learning path progress:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

// Get learning paths for a user
router.get('/user-paths', authenticate, async (req, res) => {
    try {
        const paths = await PathProgress.find({ user: req.user.id }).populate('learningPath');
        res.json(paths);
    } catch (error) {
        console.error('Error retrieving learning paths:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;
