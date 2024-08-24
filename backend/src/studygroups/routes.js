const express = require('express');
const router = express.Router();
const StudyGroup = require('../models/StudyGroup');
const authenticate = require('../auth/middleware');

// Create a study group
router.post('/create', authenticate, async (req, res) => {
    const { courseId, title } = req.body;

    try {
        const studyGroup = new StudyGroup({
            course: courseId,
            title,
            members: [req.user.id],
        });
        await studyGroup.save();

        res.status(201).json(studyGroup);
    } catch (error) {
        console.error('Error creating study group:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

// Join a study group
router.post('/join', authenticate, async (req, res) => {
    const { groupId } = req.body;

    try {
        const studyGroup = await StudyGroup.findById(groupId);
        if (!studyGroup.members.includes(req.user.id)) {
            studyGroup.members.push(req.user.id);
            await studyGroup.save();
        }

        res.json(studyGroup);
    } catch (error) {
        console.error('Error joining study group:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

// Get all study groups for a course
router.get('/course/:courseId', authenticate, async (req, res) => {
    try {
        const groups = await StudyGroup.find({ course: req.params.courseId });
        res.json(groups);
    } catch (error) {
        console.error('Error retrieving study groups:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;
