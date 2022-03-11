import { utils } from 'ethers';
import { network, ethers } from 'hardhat';
import { TreasuryV1 } from '@project/contracts/typechain/generated';

/** 
 * @dev to run this function :  yarn solidity run-local scripts/treasury/setTreasuryDestination.ts
 */
async function main() {
    console.log("Set Treasury Destination")
  
    // Owner
    const owner = await ethers.getNamedSigner('deployer');    

    // Contract
    const treasury = await ethers.getContract<TreasuryV1>('TreasuryV1');

    const newTreasuryDestination = '' // change this

    await treasury.connect(owner).setTreasuryDestination(newTreasuryDestination)
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
