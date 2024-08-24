const express = require('express');
const router = express.Router();
const StudyPlanService = require('../services/StudyPlanService');
const StudyPlan = require('../models/StudyPlan');
const StudySession = require('../models/StudySession');
const authenticate = require('../auth/middleware');

// Generate a personalized study plan
router.post('/generate', authenticate, async (req, res) => {
    try {
        const studyPlan = await StudyPlanService.generatePersonalizedPlan(req.user.id);
        res.status(201).json(studyPlan);
    } catch (error) {
        console.error('Error generating study plan:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

// Start a study session
router.post('/start-session', authenticate, async (req, res) => {
    const { studyPlanId, courseId, activityId } = req.body;

    try {
        const studySession = new StudySession({
            user: req.user.id,
            studyPlan: studyPlanId,
            course: courseId,
            activity: activityId,
            startTime: Date.now(),
            progress: 0,
        });
        await studySession.save();

        res.status(201).json(studySession);
    } catch (error) {
        console.error('Error starting study session:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

// Update a study session progress
router.post('/update-session', authenticate, async (req, res) => {
    const { sessionId, progress } = req.body;

    try {
        const studySession = await StudySession.findById(sessionId);
        if (!studySession) {
            return res.status(404).json({ message: 'Session not found' });
        }

        studySession.progress = progress;
        studySession.endTime = progress === 100 ? Date.now() : null;  // Mark end time if session is complete

        await studySession.save();
        res.status(200).json(studySession);
    } catch (error) {
        console.error('Error updating session:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

// Get user study plans
router.get('/user-plans', authenticate, async (req, res) => {
    try {
        const plans = await StudyPlan.find({ user: req.user.id }).populate('recommendedCourses').populate('recommendedActivities');
        res.json(plans);
    } catch (error) {
        console.error('Error retrieving study plans:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;
