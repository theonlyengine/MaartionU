const express = require('express');
const router = express.Router();
const Course = require('../models/Course');
const authenticate = require('../auth/middleware');

// Create a new course
router.post('/create', authenticate, async (req, res) => {
    const { title, description } = req.body;
    try {
        const course = new Course({
            title,
            description,
            teacher: req.user.id,
        });
        await course.save();
        res.status(201).json(course);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});

// Upload videos to a course
router.post('/upload-video/:courseId', authenticate, async (req, res) => {
    const { courseId } = req.params;
    const { videoUrl } = req.body; // Assuming you get the URL after uploading to a storage service

    try {
        const course = await Course.findById(courseId);
        if (!course) return res.status(404).json({ message: 'Course not found' });

        if (course.teacher.toString() !== req.user.id) {
            return res.status(403).json({ message: 'Not authorized' });
        }

        course.videos.push(videoUrl);
        await course.save();
        res.json(course);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});

// Schedule a live session
router.post('/schedule-live/:courseId', authenticate, async (req, res) => {
    const { courseId } = req.params;
    const { title, scheduledTime, link } = req.body;

    try {
        const course = await Course.findById(courseId);
        if (!course) return res.status(404).json({ message: 'Course not found' });

        if (course.teacher.toString() !== req.user.id) {
            return res.status(403).json({ message: 'Not authorized' });
        }

        course.liveSessions.push({ title, scheduledTime, link });
        await course.save();
        res.json(course);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;
