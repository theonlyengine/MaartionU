const xrpl = require('xrpl');
const { XdcClient } = require('xdc-sdk'); // Hypothetical XDC SDK import

const createWallet = async (chain) => {
    switch (chain) {
        case 'xrpl':
            const xrplWallet = xrpl.Wallet.generate();
            return { address: xrplWallet.classicAddress, seed: xrplWallet.seed };
        case 'xdc':
            const xdcClient = new XdcClient();
            const xdcWallet = xdcClient.createWallet();
            return { address: xdcWallet.address, privateKey: xdcWallet.privateKey };
        default:
            throw new Error('Unsupported chain');
    }
};

const getBalance = async (chain, address) => {
    switch (chain) {
        case 'xrpl':
            const xrplClient = new xrpl.Client('wss://s.altnet.rippletest.net:51233');
            await xrplClient.connect();
            const xrplBalance = await xrplClient.getXrpBalance(address);
            xrplClient.disconnect();
            return xrplBalance;
        case 'xdc':
            const xdcClient = new XdcClient();
            const xdcBalance = await xdcClient.getBalance(address);
            return xdcBalance;
        default:
            throw new Error('Unsupported chain');
    }
};

module.exports = { createWallet, getBalance };
