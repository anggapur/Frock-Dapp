import { utils } from 'ethers';
import { network, ethers } from 'hardhat';
import { DividenDistributorProxy, DividenDistributorV1, FrockProxy, FrockTokenV1, CommunityOffering, FairPriceLaunch } from '@project/contracts/typechain/generated';

/**
 * @dev to run this function :  yarn solidity run-local scripts/beforeUpdateDividenContract.ts
 */
async function main() {
    console.log("Flow Local")

    // Accounts
    const frockHolder1 = await ethers.getNamedSigner('frockHolder1');

    // Contracts  
    const frockProxy = (await ethers.getContract<FrockProxy>('FrockProxy'))
    const frock = (await ethers.getContract<FrockTokenV1>('FrockTokenV1')).attach(frockProxy.address)
    const dividenDistributorProxy = await ethers.getContract<DividenDistributorProxy>('DividenDistributorProxy');
    const dividenDistributor = (await ethers.getContract<DividenDistributorV1>('DividenDistributorV1')).attach(dividenDistributorProxy.address);

    // Get Implemtntation
    console.log(`Implementation : ${await dividenDistributorProxy.getImplementation()}`) //0x672B45E3b7ADD9421b49FCDfB7143cDf03C75417

    // Get Frock Holder Balance
    const frockHolder1Balance = await frock.balanceOf(frockHolder1.address);
    console.log(`Frock Holder Balance : ${frockHolder1Balance}`)

    // Get getRewardIdsUnclaimed
    const getRewardIdsUnclaimed0 = await dividenDistributor.getRewardIdsUnclaimed(frockHolder1.address, 0);
    const getRewardIdsUnclaimed1 = await dividenDistributor.getRewardIdsUnclaimed(frockHolder1.address, 1);

    console.log(`getRewardIdsUnclaimed0 : ${getRewardIdsUnclaimed0}`)
    console.log(`getRewardIdsUnclaimed1 : ${getRewardIdsUnclaimed1}`)

    // Claim Reward
    console.log(`Batch Claim Source 0`)
    const batchClaim0 = await dividenDistributor.connect(frockHolder1).batchClaimReward(getRewardIdsUnclaimed0);
    console.log(`Batch Claim Source 1`)
    const batchClaim1 = await dividenDistributor.connect(frockHolder1).batchClaimReward(getRewardIdsUnclaimed1);
 

}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
