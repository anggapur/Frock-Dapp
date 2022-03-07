// SPDX-License-Identifier: MIT
pragma solidity 0.8.5;

import "./DividenDistributorV1.sol";

contract DividenDistributorV2 is DividenDistributorV1
{
   /**
     * @dev Get list if reward id that not yet claimed by holder
     * @param holder is holder's address 
     * @param rewardSource 0 => Reward that coming from swapAndShareReward, 1 => Reward that coming from  shareReward
     */
    function getUnclaimedRewardIds(address holder, uint8 rewardSource) public virtual view returns (uint256[] memory) {
        uint256[] memory tempRewardIds = new uint256[](rewardLength);

        uint256 tempLength = 0;
        for(uint i = 0; i < rewardLength; i++) {
            // Reward memory reward = rewards[i];
            uint8 rewardSourceType = rewards[i].rewardSource;            
            if(rewardSourceType == rewardSource) {
                bool isRewardClaimed = rewards[i].rewardClaimed[holder];
                bool isHolderExcludedFromReward = rewards[i].isExcludedFromReward[holder];
                uint256 holderBalance = IERC20SnapshotUpgradeable(mainToken).balanceOfAt(holder, rewards[i].snapshotId);
                if(!isRewardClaimed && !isHolderExcludedFromReward && holderBalance > 0) {                    
                    tempRewardIds[tempLength] = i;
                    tempLength++;
                }   
            }
        }      

        uint256[] memory rewardIds = new uint256[](tempLength);
        for(uint j = 0; j < tempLength; j++ ){
            rewardIds[j] = tempRewardIds[j];
        }

        return rewardIds;
    }
}
