require('dotenv').config();
const { Web3 } = require('web3');
const abi = require('../../contracts/artifacts/contracts/Fire.sol/FIRE.json').abi;
const privateKey = process.env.PRIVATE_KEY
const nodeUrl = process.env.LOCAL_NODE_URL

//TODO: change address
const contractAddress = '0x5FbDB2315678afecb367f032d93F642f64180aa3'; 
const web3 = new Web3(nodeUrl); 
const contract = new web3.eth.Contract(abi, contractAddress);

//call tally()
export const action_tally = async () => {
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
export const action_open = async () => {
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

export const action_givePostReward = async (_address: string) => {
    console.log(_address)
    try{
        const gasPrice = await web3.eth.getGasPrice();
        const senderAddress = web3.eth.accounts.privateKeyToAccount(privateKey).address;

        const nonce = await web3.eth.getTransactionCount(senderAddress);
        const encodedFunctionCall = contract.methods.givePostReward(_address).encodeABI();
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
    
}
export const getBalance = async (_address: any) => {
    try{
        console.log(_address)
        const balance = await contract.methods.getBalance(_address).call();
        return balance;
    } catch(e) {
        console.log("error getBalance", e)
    }
}

