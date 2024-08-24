const mongoose = require('mongoose');

const userPointsSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    points: { type: Number, default: 0 },
    lastUpdated: { type: Date, default: Date.now },
});

const UserPoints = mongoose.model('UserPoints', userPointsSchema);
module.exports = UserPoints;
