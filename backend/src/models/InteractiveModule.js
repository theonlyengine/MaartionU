const mongoose = require('mongoose');

const interactiveModuleSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    course: { type: mongoose.Schema.Types.ObjectId, ref: 'Course', required: true },
    activities: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Activity' }],
    createdAt: { type: Date, default: Date.now },
});

const InteractiveModule = mongoose.model('InteractiveModule', interactiveModuleSchema);
module.exports = InteractiveModule;
