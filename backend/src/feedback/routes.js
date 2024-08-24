const express = require('express');
const router = express.Router();
const UserProgress = require('../models/UserProgress');
const Assessment = require('../models/Assessment');
const LLMService = require('../services/LLMService'); // Service to interact with the LLM
const authenticate = require('../auth/middleware');

// Provide feedback and assessment for a user's progress
router.post('/feedback', authenticate, async (req, res) => {
    const { courseId, moduleId, userId } = req.body;

    try {
        const progress = await UserProgress.findOne({ user: userId, course: courseId, module: moduleId });
        if (!progress) {
            return res.status(404).json({ message: 'Progress not found' });
        }

        // Use LLM to generate feedback based on the user's progress
        const feedback = await LLMService.generateFeedback(progress);
        const score = await LLMService.generateScore(progress);

        const assessment = new Assessment({
            user: userId,
            course: courseId,
            feedback,
            score,
        });
        await assessment.save();

        progress.feedback.push(feedback);
        progress.assessments.push(assessment._id);
        await progress.save();

        res.json({ feedback, score, assessment });
    } catch (error) {
        console.error('Error providing feedback:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

// Retrieve all assessments for a user in a course
router.get('/assessments/:courseId/:userId', authenticate, async (req, res) => {
    try {
        const assessments = await Assessment.find({ user: req.params.userId, course: req.params.courseId });
        res.json(assessments);
    } catch (error) {
        console.error('Error retrieving assessments:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;
