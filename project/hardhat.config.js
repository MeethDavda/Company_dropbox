// require('dotenv').config();
// require("@nomiclabs/hardhat-ethers");
// require("@nomiclabs/hardhat-etherscan");

// module.exports = {
// defaultNetwork: "polygon_mumbai",
// networks: {
// hardhat: {
// },
// polygon_mumbai: {
// url: "https://rpc-mumbai.maticvigil.com",
// accounts: ['134bf9fdb889707a9e79608dbec664e873fce93b029b5a0b6c443b8226d1a931']
// }
// },
// etherscan: {
// apiKey: 'TKQBBAQQCY7GPARC5U4NS9YA2THBU8ZRXE'
// },
// solidity: {
// version: "0.8.18",
// settings: {
// optimizer: {
// enabled: true,
// runs: 200
// }
// }
// },
// }
require('dotenv').config();
require("@nomiclabs/hardhat-ethers");

// const { API_URL, PRIVATE_KEY } = process.env;
PRIVATE_KEY = '134bf9fdb889707a9e79608dbec664e873fce93b029b5a0b6c443b8226d1a931'

module.exports = {
solidity: "0.8.18",
defaultNetwork: "polygon_mumbai",
networks: {
hardhat: {},
polygon_mumbai: {
url: 'https://polygon-mumbai.g.alchemy.com/v2/fy51OFKi78AkbKflZVtRfMk27JT1vByh',
accounts: [`0x${PRIVATE_KEY}`]
}
},
}