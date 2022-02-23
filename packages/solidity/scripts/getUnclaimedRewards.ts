import { network, ethers } from 'hardhat';
import { DividenDistributorProxy, DividenDistributorV1 } from '@project/contracts/typechain/generated';

/**
 * @dev to run this function :  yarn solidity run-local scripts/getUnclaimedRewards.ts --address [address] --rewardSource [0/1]
 */
async function main() {

    var args = process.argv.slice(2);
    const address = args[1];
    const rewardSource = args[3];
    
    const dividenDistributorProxy = (await ethers.getContract<DividenDistributorProxy>('DividenDistributorProxy'))
    const dividenDistributor = (await ethers.getContract<DividenDistributorV1>('DividenDistributorV1')).attach(dividenDistributorProxy.address)    
    
    const getRewardIdsUnclaimed = await dividenDistributor.getRewardIdsUnclaimed(address, rewardSource);
    const totalUnClaimedReward = await dividenDistributor.getTotalUnclaimedReward(address, rewardSource);
    console.log("getRewardIdsUnclaimed : ", getRewardIdsUnclaimed)
    console.log("totalUnClaimedReward : ", ethers.utils.formatUnits(totalUnClaimedReward))
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
