// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.

// import { ethers, run } from 'hardhat';
const hre = require("hardhat");


async function main() {
  await run('compile');
  const DStorage = await ethers.getContractFactory('DStorage');
  const dstorage = await DStorage.deploy();  // Flashloan.sol deploy function takes no arguments

  console.log(`Dstorage deployed to ${dstorage.address}`);
}

main()
  .then(() => process.exit(0))
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });