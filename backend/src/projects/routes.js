const express = require('express');
const router = express.Router();
const GroupProject = require('../models/GroupProject');
const authenticate = require('../auth/middleware');

// Create a new group project
router.post('/create', authenticate, async (req, res) => {
    const { courseId, title, description } = req.body;

    try {
        const groupProject = new GroupProject({
            course: courseId,
            title,
            description,
            groupMembers: [req.user.id],
        });
        await groupProject.save();

        res.status(201).json(groupProject);
    } catch (error) {
        console.error('Error creating group project:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

// Join an existing group project
router.post('/join', authenticate, async (req, res) => {
    const { projectId } = req.body;

    try {
        const groupProject = await GroupProject.findById(projectId);
        if (!groupProject) {
            return res.status(404).json({ message: 'Project not found' });
        }

        if (!groupProject.groupMembers.includes(req.user.id)) {
            groupProject.groupMembers.push(req.user.id);
            await groupProject.save();
        }

        res.json(groupProject);
    } catch (error) {
        console.error('Error joining group project:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

// Submit a group project
router.post('/submit', authenticate, async (req, res) => {
    const { projectId, submission } = req.body;

    try {
        const groupProject = await GroupProject.findById(projectId);
        if (!groupProject) {
            return res.status(404).json({ message: 'Project not found' });
        }

        if (!groupProject.groupMembers.includes(req.user.id)) {
            return res.status(403).json({ message: 'You are not a member of this project' });
        }

        groupProject.submission = submission;
        groupProject.submissionDate = Date.now();
        await groupProject.save();

        res.json(groupProject);
    } catch (error) {
        console.error('Error submitting group project:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

// Get all group projects for a course
router.get('/course/:courseId', authenticate, async (req, res) => {
    try {
        const projects = await GroupProject.find({ course: req.params.courseId }).populate('groupMembers', 'name');
        res.json(projects);
    } catch (error) {
        console.error('Error retrieving group projects:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;
