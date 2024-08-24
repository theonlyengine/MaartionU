const express = require('express');
const router = express.Router();
const Group = require('../models/Group');
const Post = require('../models/Post');
const Comment = require('../models/Comment');
const authenticate = require('../auth/middleware');

// Create a new group
router.post('/create-group', authenticate, async (req, res) => {
    const { name, description } = req.body;

    try {
        const group = new Group({
            name,
            description,
            createdBy: req.user.id,
        });
        await group.save();

        res.status(201).json(group);
    } catch (error) {
        console.error('Error creating group:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

// Join a group
router.post('/join-group', authenticate, async (req, res) => {
    const { groupId } = req.body;

    try {
        const group = await Group.findById(groupId);
        if (!group.members.includes(req.user.id)) {
            group.members.push(req.user.id);
            await group.save();
        }
        res.status(200).json(group);
    } catch (error) {
        console.error('Error joining group:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

// Create a post in a group
router.post('/create-post', authenticate, async (req, res) => {
    const { groupId, content } = req.body;

    try {
        const post = new Post({
            group: groupId,
            author: req.user.id,
            content,
        });
        await post.save();

        const group = await Group.findById(groupId);
        group.posts.push(post._id);
        await group.save();

        res.status(201).json(post);
    } catch (error) {
        console.error('Error creating post:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

// Comment on a post
router.post('/comment', authenticate, async (req, res) => {
    const { postId, content } = req.body;

    try {
        const comment = new Comment({
            post: postId,
            author: req.user.id,
            content,
        });
        await comment.save();

        const post = await Post.findById(postId);
        post.comments.push(comment._id);
        await post.save();

        res.status(201).json(comment);
    } catch (error) {
        console.error('Error commenting on post:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

// Get groups for a user
router.get('/user-groups', authenticate, async (req, res) => {
    try {
        const groups = await Group.find({ members: req.user.id });
        res.json(groups);
    } catch (error) {
        console.error('Error retrieving groups:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

// Get posts in a group
router.get('/group/:groupId/posts', authenticate, async (req, res) => {
    try {
        const posts = await Post.find({ group: req.params.groupId }).populate('author', 'name');
        res.json(posts);
    } catch (error) {
        console.error('Error retrieving posts:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;
