const mongoose = require('mongoose');

const threadSchema = new mongoose.Schema({
    forum: { type: mongoose.Schema.Types.ObjectId, ref: 'Forum', required: true },
    title: { type: String, required: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    createdAt: { type: Date, default: Date.now },
});

const Thread = mongoose.model('Thread', threadSchema);
module.exports = Thread;
