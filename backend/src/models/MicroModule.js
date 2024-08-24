const mongoose = require('mongoose');

const microModuleSchema = new mongoose.Schema({
    course: { type: mongoose.Schema.Types.ObjectId, ref: 'Course', required: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
    content: { type: String, required: true }, // URL or text content
    duration: { type: Number, required: true }, // Duration in minutes
    order: { type: Number, required: true }, // Order in which the module appears in the course
    createdAt: { type: Date, default: Date.now },
});

const MicroModule = mongoose.model('MicroModule', microModuleSchema);
module.exports = MicroModule;
