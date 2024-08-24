const mongoose = require('mongoose');

const certificationSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    course: { type: mongoose.Schema.Types.ObjectId, ref: 'Course', required: true },
    issueDate: { type: Date, default: Date.now },
    certificationHash: { type: String, required: true },  // Hash of the certification details stored on blockchain
    nftTokenId: { type: String },  // Token ID of the associated NFT
    blockchain: { type: String, required: true },  // Blockchain network used, e.g., 'XRPL', 'Ethereum'
});

const Certification = mongoose.model('Certification', certificationSchema);
module.exports = Certification;
