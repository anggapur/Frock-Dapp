import { network, ethers, deployments } from 'hardhat';
import { DividenDistributorProxy, DividenDistributorV1 } from '@project/contracts/typechain/generated';

/**
 * @dev to run this function :  yarn solidity run-local scripts/setExcludedFromReward.ts --address [address]
 */
async function main() { 

    // Acccounts
    const deployer = await ethers.getNamedSigner('deployer');
    const communityOffering = await ethers.getContract<CommunityOffering>(`CommunityOffering`)
    const fairLaunch = await ethers.getContract<FairPriceLaunch>(`FairPriceLaunch`)
    // Contracts
    const dividenDistributorProxy = await ethers.getContract<DividenDistributorProxy>('DividenDistributorProxy');
    const dividenDistributor = (await ethers.getContract<DividenDistributorV1>('DividenDistributorV1')).attach(dividenDistributorProxy.address);
    
    // Exclude From Reward
    await dividenDistributor.connect(deployer).excludedFromReward(communityOffering.address, true);
    console.log("communityOffering contract excluded from rewards");
    await dividenDistributor.connect(deployer).excludedFromReward(fairLaunch.address, true);
    console.log("fairLaunch contract excluded from rewards");
    await dividenDistributor.connect(deployer).excludedFromReward('0x3e3C787744449fbe4fC275d48d8adDd642c482ae', true); //todo DividenDistributor??
    console.log("Dividend Distributor excluded from rewards");
    //await dividenDistributor.connect(deployer).excludedFromReward(.address, true); //todo LP
    //todo console.log("LP excluded from rewards");



}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
