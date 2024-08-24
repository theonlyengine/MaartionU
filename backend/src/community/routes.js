const express = require('express');
const router = express.Router();
const Forum = require('../models/Forum');
const Thread = require('../models/Thread');
const Post = require('../models/Post');
const authenticate = require('../auth/middleware');

// Create a forum
router.post('/create-forum', authenticate, async (req, res) => {
    const { title, description } = req.body;

    try {
        const forum = new Forum({ title, description });
        await forum.save();

        res.status(201).json(forum);
    } catch (error) {
        console.error('Error creating forum:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

// Get all forums
router.get('/forums', authenticate, async (req, res) => {
    try {
        const forums = await Forum.find();
        res.json(forums);
    } catch (error) {
        console.error('Error retrieving forums:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

// Create a thread in a forum
router.post('/create-thread', authenticate, async (req, res) => {
    const { forumId, title } = req.body;

    try {
        const thread = new Thread({
            forum: forumId,
            title,
            user: req.user.id,
        });
        await thread.save();

        res.status(201).json(thread);
    } catch (error) {
        console.error('Error creating thread:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

// Get all threads in a forum
router.get('/forum/:forumId/threads', authenticate, async (req, res) => {
    try {
        const threads = await Thread.find({ forum: req.params.forumId }).populate('user', 'name');
        res.json(threads);
    } catch (error) {
        console.error('Error retrieving threads:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

// Create a post in a thread
router.post('/create-post', authenticate, async (req, res) => {
    const { threadId, content } = req.body;

    try {
        const post = new Post({
            thread: threadId,
            user: req.user.id,
            content,
        });
        await post.save();

        res.status(201).json(post);
    } catch (error) {
        console.error('Error creating post:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

// Get all posts in a thread
router.get('/thread/:threadId/posts', authenticate, async (req, res) => {
    try {
        const posts = await Post.find({ thread: req.params.threadId }).populate('user', 'name');
        res.json(posts);
    } catch (error) {
        console.error('Error retrieving posts:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;
