require('dotenv').config();
const Web3 = require('web3');
const abi = require('contract/artifacts/contracts/FIREToken.json').abi;
const Tx = require('ethereumjs-tx');

const infuraApiKey = process.env.INFURA_API_KEY;
const privateKey = process.env.PRIVATE_KEY
const infuraUrl = `https://mainnet.infura.io/v3/${infuraApiKey}`;

const contractAddress = '0x...'; 
const web3 = new Web3(infuraUrl); 
const contract = new web3.eth.Contract(abi, contractAddress);

//call tally()
const action_tally = async () => {
    try{
        const gasPrice = await web3.eth.getGasPrice();
        const senderAddress = web3.eth.accounts.privateKeyToAccount(privateKey).address;

        const nonce = await web3.eth.getTransactionCount(senderAddress);
        const encodedFunctionCall = contract.methods.tally().encodeABI();
        const txObject = {
            from: senderAddress,
            to: contractAddress,
            nonce: nonce,
            gasPrice: gasPrice,
            data: encodedFunctionCall
        };

        const signedTx = await web3.eth.accounts.signTransaction(txObject, privateKey);
        const txReceipt = await web3.eth.sendSignedTransaction(signedTx.rawTransaction);
        
        console.log('Transaction sent:', txReceipt);

    } catch(e) {
        console.log("Error sending tx:", e);
    }
};

// call open()
const action_open = async () => {
    try{
        const gasPrice = await web3.eth.getGasPrice();
        const senderAddress = web3.eth.accounts.privateKeyToAccount(privateKey).address;

        const nonce = await web3.eth.getTransactionCount(senderAddress);
        const encodedFunctionCall = contract.methods.open().encodeABI();
        const txObject = {
            from: senderAddress,
            to: contractAddress,
            nonce: nonce,
            gasPrice: gasPrice,
            data: encodedFunctionCall
        };

        const signedTx = await web3.eth.accounts.signTransaction(txObject, privateKey);
        const txReceipt = await web3.eth.sendSignedTransaction(signedTx.rawTransaction);
        
        console.log('Transaction sent:', txReceipt);

    } catch(e) {
        console.log("Error sending tx:", e);
    }
};

const action_givePostReward = (_address: string) => {
    async () => {
        try{
            const gasPrice = await web3.eth.getGasPrice();
            const senderAddress = web3.eth.accounts.privateKeyToAccount(privateKey).address;
    
            const nonce = await web3.eth.getTransactionCount(senderAddress);
            const encodedFunctionCall = contract.methods.givePostRewar(_address).encodeABI();
            const txObject = {
                from: senderAddress,
                to: contractAddress,
                nonce: nonce,
                gasPrice: gasPrice,
                data: encodedFunctionCall
            };
    
            const signedTx = await web3.eth.accounts.signTransaction(txObject, privateKey);
            const txReceipt = await web3.eth.sendSignedTransaction(signedTx.rawTransaction);
            
            console.log('Transaction sent:', txReceipt);
    
        } catch(e) {
            console.log("Error sending tx:", e);
        }
    };
}
const getBalance = async (_address) => {
    const balance = await contract.methods.getBalance(_address).call();
    return balance;
}

module.exports = { action_tally, action_open, action_givePostReward, getBalance }