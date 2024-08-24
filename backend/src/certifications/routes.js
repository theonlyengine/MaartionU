const express = require('express');
const router = express.Router();
const BlockchainService = require('../services/BlockchainService');
const authenticate = require('../auth/middleware');

// Issue a certification
router.post('/issue', authenticate, async (req, res) => {
    const { courseId, blockchain } = req.body;

    try {
        const certification = await BlockchainService.issueCertification(req.user.id, courseId, blockchain);
        res.status(201).json(certification);
    } catch (error) {
        console.error('Error issuing certification:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

// Mint an NFT for a certification
router.post('/mint-nft', authenticate, async (req, res) => {
    const { certificationId } = req.body;

    try {
        const certification = await BlockchainService.mintNFTForCertification(certificationId);
        res.status(201).json(certification);
    } catch (error) {
        console.error('Error minting NFT:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

// Get certifications for a user
router.get('/user-certifications', authenticate, async (req, res) => {
    try {
        const certifications = await Certification.find({ user: req.user.id }).populate('course');
        res.json(certifications);
    } catch (error) {
        console.error('Error retrieving certifications:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;
