//Script for interaction with already deployed contract, in ganache and rinkeby networks
//In this contract we read data from the blockchain, send ether from one account to another and call function from deployed account
require("dotenv").config();
const { ethers, BigNumber } = require("ethers");

const ALCHEMY_API_KEY=process.env.ALCHEMY_API_KEY;
const PRIVATE_KEY=process.env.RINKEBY_PRIVATE_KEY;

//const provider = new ethers.providers.JsonRpcProvider("http://localhost:8545");
const providerRinkeby = new ethers.providers.JsonRpcProvider(`https://eth-rinkeby.alchemyapi.io/v2/${ALCHEMY_API_KEY}`);
const signerRinkeby = new ethers.Wallet(PRIVATE_KEY, providerRinkeby);

const providerGanache = new ethers.providers.JsonRpcProvider('http://127.0.0.1:7545')
const signerGanache=providerGanache.getSigner();

//////////////////////////////////////////////////////////////////////////////

//Function to read and log data from the network
async function start() {
    const address = await signerRinkeby.getAddress()
    console.log("This is the address we deploy with: ", address)
    const block = await providerRinkeby.getBlockNumber();
    console.log(block);
    const balanceHex1 = await providerRinkeby.getBalance('0x8BF293313471236a86b08AA0F49E0c037ABD40Af');
    const balance1 = ethers.utils.formatEther(balanceHex1)
    console.log(balance1);
}
start()

//////////////////////////////////////////////////////////////////////////////

//Function to fetch balance of the account
async function check() {
    const balanceHex = await providerRinkeby.getBalance('0x984F43ccEA2aA3d5D733D7C87b5AD5ACCa4E7F1f');
    const balance = ethers.utils.formatEther(balanceHex);
    console.log(balance)
}
check()

//////////////////////////////////////////////////////////////////////////////

//Initialize our deployed contract
const myContractAddress = "0xE8a6f04DEF6d9fa9F02982b8E1d8Eea835fB7668";
const fs = require('fs');
const jsonFile = 'Test.json';
const parsed= JSON.parse(fs.readFileSync(jsonFile));
const myContractABI = parsed.abi;
const myContract =new ethers.Contract(myContractAddress, myContractABI, signerGanache);

//Change message in our Contract
async function main() {
    const message = await myContract.message();
    console.log("The message is: " + message); 

    console.log("Updating the message...");
    const tx = await myContract.changeName("Giga Mega Big");
    await tx.wait();

    const newMessage = await myContract.message();
    console.log("The new message is: " + newMessage); 
}
main()

//////////////////////////////////////////////////////////////////////////////

// Sending the transaction to the network 
const tx1 = signerRinkeby.sendTransaction({
    to: '0x984F43ccEA2aA3d5D733D7C87b5AD5ACCa4E7F1f',
    value: ethers.utils.parseEther("0.001")
})

//////////////////////////////////////////////////////////////////////////////

// Contract address and ABI of some ERC20 contract
const BS = "0xdAC17F958D2ee523a2206206994597C13D831ec7";
const BSabi = require("../USDT_abi.json");
const BScontract = new ethers.Contract(BS, BSabi, providerRinkeby);

//Function to listen to Transfer events to SomeAddress
async function listener() {
    SomeAddress = "0x56eddb7aa87536c09ccc2793473599fd21a8b17f";
    filter = BScontract.filters.Transfer(null, SomeAddress);
    console.log(filter);
}
listener()