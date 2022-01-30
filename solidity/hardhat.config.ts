import { config as dotEnvConfig } from 'dotenv';
import { HardhatUserConfig } from 'hardhat/types';

import '@nomiclabs/hardhat-waffle';
import '@typechain/hardhat';
import '@nomiclabs/hardhat-etherscan';
import '@nomiclabs/hardhat-ethers';
import 'hardhat-deploy';
import 'hardhat-gas-reporter';
import '@asheliahut/hardhat-react';
import '@openzeppelin/hardhat-upgrades';
// TODO: reenable solidity-coverage when it works
// import "solidity-coverage";
import './hardhat-tasks';

dotEnvConfig({ path: '../../.env' });

const {  
  PRIVATE_KEY_0 = '6f5728f01c5cc52436d7001584ec24f43db35c843acb470aff88d10dacd99f51'
} = process.env;

const { OPTIMIZER_DISABLED = false, OPTIMIZER_RUNS = '200' } = process.env;


const solcSettings = {
  optimizer: {
    enabled: !OPTIMIZER_DISABLED,
    runs: +OPTIMIZER_RUNS,
  },
  outputSelection: {
    '*': {
      '*': ['storageLayout'],
    },
  },
};

const config: HardhatUserConfig = {
  defaultNetwork: 'hardhat',
  solidity: {
    compilers: [
      {
        version: '0.8.5',
        settings: solcSettings,
      },
    ],
  },
  networks: {
    hardhat: {
      tags: ['test', 'local'],
      chainId: 80001,
      forking: {        
        url: `https://speedy-nodes-nyc.moralis.io/40036aec0d5bfd15ac6417d6/fantom/mainnet`,        
        blockNumber: 10248781,
      },
    },
    localhost: {
      tags: ['local'],
      timeout: 60_000,
    },
    fantom: {
      tags: ['test'],      
      url : `https://speedy-nodes-nyc.moralis.io/40036aec0d5bfd15ac6417d6/fantom/mainnet`,
      accounts: [
        PRIVATE_KEY_0
      ],
    },
    coverage: {
      url: 'http://127.0.0.1:8555', // Coverage launches its own ganache-cli client
    },
  },
  mocha: {
    timeout: 60_000,
  },  
  etherscan: {    
    apiKey: 'ZAUUEEN3BB9BM4W2DX1EMBQF3QX34PS8QP'
  },
  paths: {
    deployments: '../contracts/deployments',
    react: '../react-app/src/generated',
  },
  typechain: {
    target: 'ethers-v5',
    outDir: '../react-app/src/generated/typechain',
    externalArtifacts: ['../contracts/deployments/external/*.json'],
  },
  namedAccounts: {   
    deployer: {
      default: 0,       
    },     
  },
  react: {
    providerPriority: ['web3modal', 'fantom', 'hardhat'],
    fallbackProvider: 'fantom',   
  }  
};

export default config;
