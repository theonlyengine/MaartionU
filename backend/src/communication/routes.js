const express = require('express');
const router = express.Router();
const ChatMessage = require('../models/ChatMessage');
const ChatRoom = require('../models/ChatRoom');
const VideoSession = require('../models/VideoSession');
const authenticate = require('../auth/middleware');

// Create a new chat room
router.post('/create-chat-room', authenticate, async (req, res) => {
    const { courseId, participantIds } = req.body;

    try {
        const chatRoom = new ChatRoom({
            course: courseId,
            participants: participantIds,
        });
        await chatRoom.save();

        res.status(201).json(chatRoom);
    } catch (error) {
        console.error('Error creating chat room:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

// Send a chat message
router.post('/send-message', authenticate, async (req, res) => {
    const { chatRoomId, message } = req.body;

    try {
        const chatMessage = new ChatMessage({
            chatRoom: chatRoomId,
            sender: req.user.id,
            message,
        });
        await chatMessage.save();

        res.status(201).json(chatMessage);
    } catch (error) {
        console.error('Error sending chat message:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

// Get chat messages for a room
router.get('/chat-room/:chatRoomId/messages', authenticate, async (req, res) => {
    try {
        const messages = await ChatMessage.find({ chatRoom: req.params.chatRoomId }).populate('sender', 'name');
        res.json(messages);
    } catch (error) {
        console.error('Error retrieving chat messages:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

// Schedule a video session
router.post('/schedule-video-session', authenticate, async (req, res) => {
    const { courseId, startTime, participantIds } = req.body;

    try {
        const videoSession = new VideoSession({
            course: courseId,
            host: req.user.id,
            participants: participantIds,
            startTime,
        });
        await videoSession.save();

        res.status(201).json(videoSession);
    } catch (error) {
        console.error('Error scheduling video session:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

// Get video sessions for a course
router.get('/course/:courseId/video-sessions', authenticate, async (req, res) => {
    try {
        const sessions = await VideoSession.find({ course: req.params.courseId }).populate('participants', 'name');
        res.json(sessions);
    } catch (error) {
        console.error('Error retrieving video sessions:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;
