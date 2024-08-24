const mongoose = require('mongoose');

const credentialSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    course: { type: mongoose.Schema.Types.ObjectId, ref: 'Course', required: true },
    certificateURL: { type: String, required: true }, // URL to the blockchain-verified certificate
    issuedAt: { type: Date, default: Date.now },
});

const Credential = mongoose.model('Credential', credentialSchema);
module.exports = Credential;
