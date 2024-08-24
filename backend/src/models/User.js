const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: ['student', 'teacher'], default: 'student' },
    resetToken: String,
    resetTokenExpiration: Date,
    accessibilityPreferences: {
        language: { type: String, default: 'en' },
        fontSize: { type: String, default: 'medium' }, // Options: small, medium, large
        colorContrast: { type: String, default: 'normal' }, // Options: normal, high
    },
});

const User = mongoose.model('User', userSchema);
module.exports = User;