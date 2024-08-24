const express = require('express');
const router = express.Router();
const { registerUser, loginUser, getUserProfile } = require('./controllers');
const authenticate = require('./middleware');
const crypto = require('crypto');
const nodemailer = require('nodemailer');
const User = require('../models/User');

// User Registration
router.post('/register', registerUser);

// User Login
router.post('/login', loginUser);

// Get User Profile
router.get('/profile', authenticate, getUserProfile);

// Update User Profile
router.put('/profile', authenticate, async (req, res) => {
    const { name, email } = req.body;
    try {
        const user = await User.findById(req.user.id);
        if (user) {
            user.name = name || user.name;
            user.email = email || user.email;
            const updatedUser = await user.save();
            res.json(updatedUser);
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});

// Request Password Reset
router.post('/reset-password', async (req, res) => {
    const { email } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) return res.status(404).json({ message: 'User not found' });

        const resetToken = crypto.randomBytes(32).toString('hex');
        user.resetToken = resetToken;
        user.resetTokenExpiration = Date.now() + 3600000; // 1 hour
        await user.save();

        const transporter = nodemailer.createTransport({
            service: 'Gmail',
            auth: { user: process.env.EMAIL, pass: process.env.EMAIL_PASSWORD }
        });

        const mailOptions = {
            to: user.email,
            from: process.env.EMAIL,
            subject: 'Password Reset',
            text: `You requested a password reset. Click the link to reset your password: 
            ${process.env.CLIENT_URL}/reset-password/${resetToken}`
        };

        await transporter.sendMail(mailOptions);
        res.json({ message: 'Password reset link sent' });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});

// Reset Password
router.post('/reset-password/:token', async (req, res) => {
    const { token } = req.params;
    const { password } = req.body;
    try {
        const user = await User.findOne({ resetToken: token, resetTokenExpiration: { $gt: Date.now() } });
        if (!user) return res.status(400).json({ message: 'Invalid or expired token' });

        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password, salt);
        user.resetToken = undefined;
        user.resetTokenExpiration = undefined;
        await user.save();

        res.json({ message: 'Password updated' });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;
