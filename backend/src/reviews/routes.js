const express = require('express');
const router = express.Router();
const PeerReview = require('../models/PeerReview');
const authenticate = require('../auth/middleware');

// Submit a peer review
router.post('/review', authenticate, async (req, res) => {
    const { revieweeId, courseId, feedback, rating } = req.body;

    try {
        const review = new PeerReview({
            reviewer: req.user.id,
            reviewee: revieweeId,
            course: courseId,
            feedback,
            rating,
        });
        await review.save();
        res.status(201).json(review);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});

// Get reviews for a specific user
router.get('/reviews/:userId', authenticate, async (req, res) => {
    try {
        const reviews = await PeerReview.find({ reviewee: req.params.userId }).populate('reviewer', 'name');
        res.json(reviews);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;
