import { utils } from 'ethers';
import { network, ethers } from 'hardhat';
import { TreasuryV1 } from '@project/contracts/typechain/generated';

/** 
 * @dev to run this function :  yarn solidity run-local scripts/treasury/setFixedTokenToSwap.ts
 */
async function main() {
    console.log("Set Fixed Token to Swap")
  
    // Owner
    const owner = await ethers.getNamedSigner('deployer');    

    // Contract
    const treasury = await ethers.getContract<TreasuryV1>('TreasuryV1');

    const newFixedTokenToSwap = ethers.utils.parseUnits('', 9); // change this

    await treasury.connect(owner).setFixedTokenToSwap(newFixedTokenToSwap)
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
