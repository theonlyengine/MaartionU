const mongoose = require('mongoose');

const badgeSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    iconUrl: { type: String }, // URL to the badge icon
    criteria: { type: String, required: true }, // Example: "Complete 5 courses"
    createdAt: { type: Date, default: Date.now },
});

const Badge = mongoose.model('Badge', badgeSchema);
module.exports = Badge;
