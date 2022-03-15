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
  PRIVATE_KEY_DEPLOYER  = "",
} = process.env;

const {
  PRIVATE_KEY_TREASURY  = "",
} = process.env;

const {
  PRIVATE_KEY_TEAM   = "",
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
      chainId: 250,
      forking: {        
        url: 'https://nd-248-371-542.p2pify.com/cbfc247834023d478a85c3565f4ffc06',
        blockNumber: 33412045,
      },
    },
    localhost: {
      tags: ['local'],
      timeout: 60_000,
    },
    fantom: {
      tags: ['test'],      
      url : 'https://speedy-nodes-nyc.moralis.io/40036aec0d5bfd15ac6417d6/fantom/mainnet',
      accounts: [
        PRIVATE_KEY_DEPLOYER
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
    apiKey: "ZAUUEEN3BB9BM4W2DX1EMBQF3QX34PS8QP",
  },
  paths: {
    deployments: "../contracts/deployments",
    react: "../react-app/src/generated",
  },
  typechain: {
    target: "ethers-v5",
    outDir: "../react-app/src/generated/typechain",
    externalArtifacts: ["../contracts/deployments/external/*.json"],
  },
  namedAccounts: {
    deployer: {
      //default: 0
      default: '0x4b2F59151d4bb1692439226f872ae7D8B93A9B11'
      // default: '0x8B43eb774baE835b20Ac8A222C5A91dCD339F376'
    },
    wrongAdmin: {
      default : '0x976EA74026E726554dB657fA54763abd0C3a0aa9'
    },    
    usdcHolder: {
      default : '0x93c08a3168fc469f3fc165cd3a471d19a37ca19e',
      fantom : '0x93c08a3168fc469f3fc165cd3a471d19a37ca19e'
    },  
    dividenDistributor: {
      default : '0x627306090abaB3A6e1400e9345bC60c78a8BEf57'
    },
    treasury: {
      default : '0x8Eaedb026f0c6A0174Ca5Eb9C4eCFeD28237a176'
    },
    marketing: {
      default : '0x995CdE3d74C099e6716D228B27B7C1cFf3a1E5d7' // PK : 466dda59135afdfc1604cee576db04d5e4331844e88bba939f475cbdca00d9a9
    },
    wftmHolder: {
      default : '0x93c08a3168fc469f3fc165cd3a471d19a37ca19e'
    },
    treasuryContract: {
      default: '0x6A3083F47d56dB7BdB2783698407Cc95A0DC7a1c'
    },
    team: {
      default: '0xE0ce2548771cecdd5e071ACBa7B61Fe9A7E8786c'
    },
    user1: {
      default: 1,
    },
    user2: {
      default: 2,
    },
    user3: {
      default: 3,
    },
    user4: {
      default: 4,
    },
    user5: {
      default: 5,
    },
    user6: {
      default: 6,
    },
    user7: {
      default: 7,
    },
    user8: {
      default: 8,
    },
    user9: {
      default: 9,
    },
    user10: {
      default: 10,
    },
    user11: {
      default: 11,
    },
    user12: {
      default: 12,
    },
    user13: {
      default: 13,
    },
    user14: {
      default: 14,
    },
    user15: {
      default: 15,
    },
    user16: {
      default: 16,
    },
    user17: {
      default: 17,
    },
    notInvestor: {
      default: 18,
    },        
    frockHolder1: {
      default: '0xd7f1d4c931ebb9f9d150097065f59b1bff2529d9'
    },
    frockHolder3: {
      default: '0x1379b48ac9f3ede062644c5d4ff293947fce58d5' // holding 40,012.035741079 FROCK on block number 33412045
    },
    frockHolder4: {
      default: '0x02a43cb00794bb696f01e95494f3782d207f32a7' // holding 17,896.272127274 FROCK on block number 33412045
    }
  },
  react: {
    providerPriority: ["web3modal", "fantom", "hardhat"],
    fallbackProvider: "fantom",
  },
};

export default config;
