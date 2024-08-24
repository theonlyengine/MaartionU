const express = require('express');
const router = express.Router();
const { createWallet, getBalance } = require('./multi-chain');
const { deployContract, interactWithContract } = require('./smart-contracts');
const authenticate = require('../auth/middleware');

// Wallet creation endpoint
router.post('/create-wallet', authenticate, async (req, res) => {
    const { chain } = req.body; // chain could be 'xrpl', 'xdc', etc.
    try {
        const wallet = await createWallet(chain);
        res.json(wallet);
    } catch (error) {
        res.status(500).json({ message: 'Error creating wallet' });
    }
});

// Balance retrieval endpoint
router.get('/balance/:chain/:address', authenticate, async (req, res) => {
    const { chain, address } = req.params;
    try {
        const balance = await getBalance(chain, address);
        res.json({ balance });
    } catch (error) {
        res.status(500).json({ message: 'Error fetching balance' });
    }
});

// Smart contract deployment endpoint
router.post('/deploy-contract', authenticate, async (req, res) => {
    const { chain, contractCode, walletSeed } = req.body;
    try {
        const result = await deployContract(chain, contractCode, walletSeed);
        res.json(result);
    } catch (error) {
        res.status(500).json({ message: 'Error deploying contract' });
    }
});

// Smart contract interaction endpoint
router.post('/interact-contract', authenticate, async (req, res) => {
    const { chain, contractAddress, functionName, args, walletSeed } = req.body;
    try {
        const result = await interactWithContract(chain, contractAddress, functionName, args, walletSeed);
        res.json(result);
    } catch (error) {
        res.status(500).json({ message: 'Error interacting with contract' });
    }
});

module.exports = router;
