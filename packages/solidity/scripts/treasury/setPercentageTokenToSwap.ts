import { utils } from 'ethers';
import { network, ethers } from 'hardhat';
import { TreasuryV1 } from '@project/contracts/typechain/generated';

/** 
 * @dev to run this function :  yarn solidity run-local scripts/treasury/setPercentageTokenToSwap.ts
 */
async function main() {
    console.log("Set Percentage Token to Swap")
  
    // Owner
    const owner = await ethers.getNamedSigner('deployer');    

    // Contract
    const treasury = await ethers.getContract<TreasuryV1>('TreasuryV1');

    const newPercentage = 10_00; // change this, 2 decimals

    await treasury.connect(owner).setPercentageTokenToSwap(newPercentage)
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
