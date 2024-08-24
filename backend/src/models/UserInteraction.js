const mongoose = require('mongoose');

const userInteractionSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    contentId: { type: mongoose.Schema.Types.ObjectId, ref: 'Content' }, // References the content they interacted with
    interactionType: { type: String, enum: ['viewed', 'liked', 'completed'], required: true },
    timestamp: { type: Date, default: Date.now },
});

const UserInteraction = mongoose.model('UserInteraction', userInteractionSchema);
module.exports = UserInteraction;
