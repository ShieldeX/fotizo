// https://eth-ropsten.alchemyapi.io/v2/i1VWE6YwFAHw7ND460sKhIdUMAaDejQ2

require('@nomiclabs/hardhat-waffle');

module.exports = {
  solidity: '0.8.0',
  networks: {
    ropsten: {
      url:'https://eth-ropsten.alchemyapi.io/v2/i1VWE6YwFAHw7ND460sKhIdUMAaDejQ2',
      accounts:['eb160ccf42462ad437e9cc7a7515af3d5023182798abf4c52efd93b1be500ec8']
    }
  }
}