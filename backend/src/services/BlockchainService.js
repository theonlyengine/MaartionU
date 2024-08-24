const Certification = require('../models/Certification');
const xrpl = require('xrpl');

class BlockchainService {
    static async issueCertification(userId, courseId, blockchain = 'XRPL') {
        const client = new xrpl.Client('wss://s.altnet.rippletest.net:51233');
        await client.connect();

        // Example payload to create a hash of the certification
        const certificationData = JSON.stringify({
            userId,
            courseId,
            issueDate: new Date().toISOString(),
        });
        const certificationHash = xrpl.utils.hash(certificationData);

        // Example of issuing a certification on the XRPL blockchain
        const wallet = xrpl.Wallet.fromSeed(process.env.XRPL_SEED);
        const tx = {
            TransactionType: 'Payment',
            Account: wallet.classicAddress,
            Amount: '10',  // Example: issue some small amount of currency to represent certification
            Destination: 'rXXXXXXXXXXXXXXXXXXXXXXX',  // Destination address (can be the platform's address)
            InvoiceID: certificationHash,
        };
        const signed = wallet.sign(tx);
        const result = await client.submitAndWait(signed.tx_blob);

        await client.disconnect();

        // Save the certification with blockchain details
        const certification = new Certification({
            user: userId,
            course: courseId,
            certificationHash,
            blockchain,
        });
        await certification.save();

        return certification;
    }

    static async mintNFTForCertification(certificationId) {
        // Example of minting an NFT using XRPL
        const certification = await Certification.findById(certificationId).populate('user course');
        const client = new xrpl.Client('wss://s.altnet.rippletest.net:51233');
        await client.connect();

        const wallet = xrpl.Wallet.fromSeed(process.env.XRPL_SEED);
        const tx = {
            TransactionType: 'NFTokenMint',
            Account: wallet.classicAddress,
            URI: xrpl.convertStringToHex(`Certification for ${certification.course.title}`),
            NFTokenTaxon: 0,  // Category or type of NFT (can be set as required)
        };
        const signed = wallet.sign(tx);
        const result = await client.submitAndWait(signed.tx_blob);

        await client.disconnect();

        // Update the certification with NFT details
        certification.nftTokenId = result.result.tx_json.hash;  // Example of using the transaction hash as the NFT ID
        await certification.save();

        return certification;
    }
}

module.exports = BlockchainService;
