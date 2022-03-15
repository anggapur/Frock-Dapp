import { network, ethers, deployments } from 'hardhat';
import { DividenDistributorProxy, DividenDistributorV2 } from '@project/contracts/typechain/generated';

/**
 * @dev to run this function :  yarn solidity run-local scripts/after-update/setMinimumFrockToSwap.ts
 */
async function main() {    
    console.log('Set Minimum Frock Token to Swap')
    // Change this params
    const newMinimumFrockToSwap = ethers.utils.parseUnits("1", 9)

    // Acccounts
    const deployer = await ethers.getNamedSigner('deployer');
    // Contracts
    const dividenDistributorProxy = await ethers.getContract<DividenDistributorProxy>('DividenDistributorProxy');
    const dividenDistributor = (await ethers.getContract<DividenDistributorV2>('DividenDistributorV2')).attach(dividenDistributorProxy.address);
    
    // Exclude From Reward
    await dividenDistributor.connect(deployer).setMinimumFrockToSwap(newMinimumFrockToSwap);
    
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
