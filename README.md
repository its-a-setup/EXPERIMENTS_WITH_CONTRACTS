# EXPERIMENTS_WITH_CONTRACTS
Experiments with Solidity contracts, Ganache chain, and Ethers.js

With code from this repo you can deploy your own contract to several chains (Hardhat (default), Ganache, and Rinkeby (testnet)) and then interact with your contract (send Ether, call functions, change state variables).

Additionally, the Ganache chain allows you to fork mainnet and interact with publicly known contracts, change their data and listen to events. In interact.js file, you can interact with the USDT contract and listen to Transfer events.

# Dependencies
Navigate to your project directory and run the following commands 1 by 1:
```bash
 npm init --yes
```
```bash
 npm install --save-dev hardhat
```
```bash
 npx hardhat
```
>Create a new empty hardhat.config.js
```bash
 npm install dotenv --save
```
```bash
npm install @openzeppelin/contracts
```
```bash
 npm install --save-dev @nomiclabs/hardhat-ethers ethers@^5.0.0
```
```bash
  npm install --save-dev @nomiclabs/hardhat-waffle ethereum-waffle chai
```

# QuickStart
1) Deploy the contract Test.sol to one of the networks (e.g. rinkeby) using Hardhat. To do that run in project directory: 
```bash
 npx hardhat --network ganache run scripts/deploy.js
```
2) Go to Etherscan and check contract's address
3) Copy contract's address from Etherscan and pass address together with contract's ABI to `interact.js` file. Change parameter of main() function to change message variable in your deployed contract.
4) Run `interact.js` file to deploy the changes.
 ```bash
 npx hardhat --network ganache run scripts/interact.js
```
> P.s. don't forget to put your Private Key and Alchemy/Infura key in .env file (NEVER UPLOAD THEM TO GITHUB)
