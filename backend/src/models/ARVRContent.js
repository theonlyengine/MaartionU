const mongoose = require('mongoose');

const arvrContentSchema = new mongoose.Schema({
    course: { type: mongoose.Schema.Types.ObjectId, ref: 'Course', required: true },
    module: { type: mongoose.Schema.Types.ObjectId, ref: 'Module', required: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
    contentURL: { type: String, required: true }, // URL to AR/VR content
    contentType: { type: String, enum: ['AR', 'VR'], required: true }, // Type of content
    createdAt: { type: Date, default: Date.now },
});

const ARVRContent = mongoose.model('ARVRContent', arvrContentSchema);
module.exports = ARVRContent;
