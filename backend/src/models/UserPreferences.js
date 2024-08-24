const mongoose = require('mongoose');

const userPreferencesSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    preferredLearningStyle: { type: String, enum: ['visual', 'auditory', 'kinesthetic'], default: 'visual' },
    preferredPacing: { type: String, enum: ['fast', 'medium', 'slow'], default: 'medium' },
    interactionHistory: [{ type: mongoose.Schema.Types.Mixed }], // Flexible schema for storing interactions
});

const UserPreferences = mongoose.model('UserPreferences', userPreferencesSchema);
module.exports = UserPreferences;
