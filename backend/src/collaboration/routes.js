const express = require('express');
const router = express.Router();
const Project = require('../models/Project');
const PeerReview = require('../models/PeerReview');
const authenticate = require('../auth/middleware');

// Create a new project
router.post('/create-project', authenticate, async (req, res) => {
    const { title, description, courseId, dueDate, memberIds } = req.body;

    try {
        const project = new Project({
            title,
            description,
            course: courseId,
            dueDate,
            members: memberIds,
        });
        await project.save();

        res.status(201).json(project);
    } catch (error) {
        console.error('Error creating project:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

// Get projects for a course
router.get('/course/:courseId/projects', authenticate, async (req, res) => {
    try {
        const projects = await Project.find({ course: req.params.courseId }).populate('members', 'name');
        res.json(projects);
    } catch (error) {
        console.error('Error retrieving projects:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

// Submit a peer review
router.post('/submit-review', authenticate, async (req, res) => {
    const { projectId, feedback, rating } = req.body;

    try {
        const review = new PeerReview({
            reviewer: req.user.id,
            project: projectId,
            feedback,
            rating,
        });
        await review.save();

        res.status(201).json(review);
    } catch (error) {
        console.error('Error submitting peer review:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

// Get peer reviews for a project
router.get('/project/:projectId/reviews', authenticate, async (req, res) => {
    try {
        const reviews = await PeerReview.find({ project: req.params.projectId }).populate('reviewer', 'name');
        res.json(reviews);
    } catch (error) {
        console.error('Error retrieving peer reviews:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;
