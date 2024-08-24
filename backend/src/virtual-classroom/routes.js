const express = require('express');
const router = express.Router();
const LiveStreamingService = require('../services/LiveStreamingService');
const VirtualClassroom = require('../models/VirtualClassroom');
const authenticate = require('../auth/middleware');

// Schedule a new virtual classroom
router.post('/schedule', authenticate, async (req, res) => {
    const { title, description, scheduledTime, duration } = req.body;

    try {
        const classroom = new VirtualClassroom({
            title,
            description,
            instructor: req.user.id,
            scheduledTime,
            duration,
        });
        await classroom.save();
        res.status(201).json(classroom);
    } catch (error) {
        console.error('Error scheduling virtual classroom:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

// Start a live session
router.post('/start-session', authenticate, async (req, res) => {
    const { classroomId } = req.body;

    try {
        const session = await LiveStreamingService.startLiveSession(classroomId, req.user.id);
        res.status(201).json(session);
    } catch (error) {
        console.error('Error starting live session:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

// End a live session
router.post('/end-session', authenticate, async (req, res) => {
    const { sessionId } = req.body;

    try {
        const session = await LiveStreamingService.endLiveSession(sessionId);
        res.status(200).json(session);
    } catch (error) {
        console.error('Error ending live session:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

// Get live sessions for a classroom
router.get('/sessions', authenticate, async (req, res) => {
    const { classroomId } = req.query;

    try {
        const sessions = await LiveStreamingService.getLiveSessionsForClassroom(classroomId);
        res.json(sessions);
    } catch (error) {
        console.error('Error retrieving live sessions:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;
