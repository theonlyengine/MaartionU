const mongoose = require('mongoose');

const contentSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    url: { type: String, required: true },
    type: { type: String, enum: ['video', 'article', 'textbook', 'external'], required: true },
    category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category', required: true },
    uploadedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    uploadedAt: { type: Date, default: Date.now },
});

const Content = mongoose.model('Content', contentSchema);
module.exports = Content;
