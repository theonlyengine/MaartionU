const express = require('express');
const router = express.Router();
const Forum = require('../models/Forum');
const Thread = require('../models/Thread');
const Post = require('../models/Post');
const authenticate = require('../auth/middleware');

// Create a forum for a course
router.post('/forum', authenticate, async (req, res) => {
    const { courseId, title, description } = req.body;

    try {
        const forum = new Forum({ course: courseId, title, description });
        await forum.save();
        res.status(201).json(forum);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});

// Create a thread in a forum
router.post('/thread', authenticate, async (req, res) => {
    const { forumId, title } = req.body;

    try {
        const thread = new Thread({ forum: forumId, title, author: req.user.id });
        await thread.save();
        res.status(201).json(thread);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});

// Post a message in a thread
router.post('/post', authenticate, async (req, res) => {
    const { threadId, content } = req.body;

    try {
        const post = new Post({ thread: threadId, author: req.user.id, content });
        await post.save();
        res.status(201).json(post);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});

// Get all threads in a forum
router.get('/forum/:forumId/threads', authenticate, async (req, res) => {
    try {
        const threads = await Thread.find({ forum: req.params.forumId }).populate('author', 'name');
        res.json(threads);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});

// Get all posts in a thread
router.get('/thread/:threadId/posts', authenticate, async (req, res) => {
    try {
        const posts = await Post.find({ thread: req.params.threadId }).populate('author', 'name');
        res.json(posts);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;
