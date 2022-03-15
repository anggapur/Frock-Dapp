import { network, ethers } from 'hardhat';
import { DividenDistributorProxy, DividenDistributorV2, FrockProxy, FrockTokenV1 } from '@project/contracts/typechain/generated';

/**
 * @dev to run this function :  yarn solidity run-local scripts/after-update/shareReward0.ts
 * @deb Make sure Dividen Contract have Frock before running this function
 */
async function main() {
    console.log("Share Reward Mode 0")
    
    const rewarder = await ethers.getNamedSigner('user1');  // Change the rewarder

    const deployer = await ethers.getNamedSigner('deployer'); 
    const dividenDistributorProxy = await ethers.getContract<DividenDistributorProxy>('DividenDistributorProxy');
    const dividenDistributor = (await ethers.getContract<DividenDistributorV2>('DividenDistributorV2')).attach(dividenDistributorProxy.address);
    const frockProxy = (await ethers.getContract<FrockProxy>('FrockProxy'))    
    const frock = (await ethers.getContract<FrockTokenV1>('FrockTokenV1')).attach(frockProxy.address)      

    console.log(`Minimum Frock Token to Swap : ${await dividenDistributor.minimumFrockToSwap()} `)
    console.log(`Frock balance Of Dividen Contract Before Swap : ${await frock.balanceOf(dividenDistributor.address)} `)

    const REWARDER_ROLE = await dividenDistributor.REWARDER_ROLE();
    await dividenDistributor.connect(deployer).grantRole(REWARDER_ROLE, rewarder.address);
    await dividenDistributor.connect(rewarder).swapAndShareReward();

    console.log(`Frock balance Of Dividen Contract After Swap : ${await frock.balanceOf(dividenDistributor.address)} `)

}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
