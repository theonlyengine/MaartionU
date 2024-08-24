const express = require('express');
const router = express.Router();
const { adaptiveLearningModel } = require('./algorithms');
const { collaborativeFiltering } = require('./recommendations');
const authenticate = require('../auth/middleware');

// Adaptive Learning Endpoint
router.post('/adaptive-learning', authenticate, async (req, res) => {
    const { data } = req.body;
    try {
        const model = adaptiveLearningModel(data);
        res.json({ message: 'Model trained successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error training model' });
    }
});

// Collaborative Filtering Endpoint
router.post('/recommendations', authenticate, async (req, res) => {
    const { userInteractions, numUsers, numItems } = req.body;
    try {
        const recommendations = collaborativeFiltering(userInteractions, numUsers, numItems);
        res.json(recommendations.arraySync());
    } catch (error) {
        res.status(500).json({ message: 'Error generating recommendations' });
    }
});

module.exports = router;
