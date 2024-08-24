const mongoose = require('mongoose');

const externalResourceSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    url: { type: String, required: true },  // Link to the external resource
    provider: { type: String, required: true },  // Example: "Khan Academy", "Coursera"
    category: { type: String, required: true },  // Example: "Math", "Science"
    language: { type: String, required: true },  // Language of the resource
    createdAt: { type: Date, default: Date.now },
});

const ExternalResource = mongoose.model('ExternalResource', externalResourceSchema);
module.exports = ExternalResource;
