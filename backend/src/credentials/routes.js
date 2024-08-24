const express = require('express');
const router = express.Router();
const Credential = require('../models/Credential');
const BlockchainService = require('../services/BlockchainService'); // Service to interact with blockchain
const authenticate = require('../auth/middleware');

// Issue a blockchain credential
router.post('/issue', authenticate, async (req, res) => {
    const { courseId, userId } = req.body;

    try {
        const certificateURL = await BlockchainService.issueCertificate(userId, courseId);
        const credential = new Credential({
            user: userId,
            course: courseId,
            certificateURL,
        });
        await credential.save();

        res.status(201).json(credential);
    } catch (error) {
        console.error('Error issuing credential:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

// Verify a blockchain credential
router.get('/verify/:credentialId', authenticate, async (req, res) => {
    try {
        const credential = await Credential.findById(req.params.credentialId);
        if (!credential) {
            return res.status(404).json({ message: 'Credential not found' });
        }

        const isValid = await BlockchainService.verifyCertificate(credential.certificateURL);
        res.json({ isValid });
    } catch (error) {
        console.error('Error verifying credential:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;
