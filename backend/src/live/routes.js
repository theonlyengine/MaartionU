const express = require('express');
const router = express.Router();
const authenticate = require('../auth/middleware');
const axios = require('axios'); // Using Axios to make API requests to Zoom or other services

// Schedule a live session using Zoom
router.post('/zoom/schedule', authenticate, async (req, res) => {
    const { topic, startTime, duration } = req.body;
    try {
        // Prepare the request payload
        const requestBody = {
            topic: topic,
            type: 2, // Scheduled meeting
            start_time: startTime,
            duration: duration,
            timezone: 'UTC',
            settings: {
                host_video: true,
                participant_video: true,
                mute_upon_entry: true,
                approval_type: 1, // Automatically approve participants
            },
        };

        // Request to Zoom API to create a meeting
        const response = await axios.post('https://api.zoom.us/v2/users/me/meetings', requestBody, {
            headers: {
                'Authorization': `Bearer ${process.env.ZOOM_JWT_TOKEN}`, // JWT token for Zoom API
                'Content-Type': 'application/json',
            },
        });

        // Respond with the created meeting details
        res.json({
            meetingId: response.data.id,
            joinUrl: response.data.join_url,
            startUrl: response.data.start_url,
            topic: response.data.topic,
            startTime: response.data.start_time,
        });

    } catch (error) {
        console.error('Error scheduling live session:', error.response ? error.response.data : error.message);
        res.status(500).json({ message: 'Error scheduling live session' });
    }
});

module.exports = router;
