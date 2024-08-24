const express = require('express');
const router = express.Router();
const ExternalResourceService = require('../services/ExternalResourceService');
const authenticate = require('../auth/middleware');

// Fetch and store external resources from Khan Academy and Coursera
router.post('/fetch-resources', authenticate, async (req, res) => {
    try {
        await ExternalResourceService.fetchKhanAcademyResources();
        await ExternalResourceService.fetchCourseraResources();
        res.status(201).json({ message: 'External resources fetched and stored successfully.' });
    } catch (error) {
        console.error('Error fetching external resources:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

// Get all external resources
router.get('/resources', authenticate, async (req, res) => {
    try {
        const resources = await ExternalResourceService.getAllExternalResources();
        res.json(resources);
    } catch (error) {
        console.error('Error retrieving external resources:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;
