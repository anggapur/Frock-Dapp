import { utils } from 'ethers';
import { network, ethers } from 'hardhat';
import { TreasuryV1 } from '@project/contracts/typechain/generated';

/**
 * @dev Manually Withdraw FTM 
 * @dev Fund will be transfered to treasuryDestination's address
 * @dev to run this function :  yarn solidity run-local scripts/treasury/withdraw.ts
 */
async function main() {
    console.log("Withdraw")
  
    // Owner
    const owner = await ethers.getNamedSigner('deployer');    

    // Contract
    const treasury = await ethers.getContract<TreasuryV1>('TreasuryV1');

    await treasury.connect(owner).withdraw()
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
