const express = require('express');
const router = express.Router();
const Content = require('../models/Content');
const Category = require('../models/Category');
const authenticate = require('../auth/middleware');

// Upload new content
router.post('/upload', authenticate, async (req, res) => {
    const { title, description, url, type, categoryId } = req.body;

    try {
        const content = new Content({
            title,
            description,
            url,
            type,
            category: categoryId,
            uploadedBy: req.user.id,
        });
        await content.save();

        res.status(201).json(content);
    } catch (error) {
        console.error('Error uploading content:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

// Get content by category
router.get('/category/:categoryId', authenticate, async (req, res) => {
    try {
        const content = await Content.find({ category: req.params.categoryId });
        res.json(content);
    } catch (error) {
        console.error('Error retrieving content:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

// Get all categories
router.get('/categories', authenticate, async (req, res) => {
    try {
        const categories = await Category.find();
        res.json(categories);
    } catch (error) {
        console.error('Error retrieving categories:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

// Create a new category
router.post('/create-category', authenticate, async (req, res) => {
    const { name, description } = req.body;

    try {
        const category = new Category({ name, description });
        await category.save();

        res.status(201).json(category);
    } catch (error) {
        console.error('Error creating category:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;
