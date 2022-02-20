import { network, ethers, deployments } from 'hardhat';
import { DividenDistributorProxy, DividenDistributorV1 } from '@project/contracts/typechain/generated';

/**
 * @dev to run this function :  yarn solidity run-local scripts/setExcludedFromReward.ts --address [address]
 */
async function main() { 

    var args = process.argv.slice(2);
    const address = args[1];
    
    // Acccounts
    const deployer = await ethers.getNamedSigner('deployer');
    // Contracts
    const dividenDistributorProxy = await ethers.getContract<DividenDistributorProxy>('DividenDistributorProxy');
    const dividenDistributor = (await ethers.getContract<DividenDistributorV1>('DividenDistributorV1')).attach(dividenDistributorProxy.address);
    
    // Exclude From Reward
    await dividenDistributor.connect(deployer).excludedFromReward(address, true);
    
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
