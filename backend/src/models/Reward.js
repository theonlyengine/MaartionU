const mongoose = require('mongoose');

const rewardSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    type: { type: String, enum: ['discount', 'gift', 'certificate'], required: true },
    details: { type: String, required: true }, // Details of the reward, e.g., discount code, gift description
    issuedAt: { type: Date, default: Date.now },
});

const Reward = mongoose.model('Reward', rewardSchema);
module.exports = Reward;
