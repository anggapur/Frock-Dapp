import { utils } from 'ethers';
import { network, ethers } from 'hardhat';
import { TreasuryV1 } from '@project/contracts/typechain/generated';

/**
 * @dev Manually Withdraw FROCK 
 * @dev to run this function :  yarn solidity run-local scripts/treasury/withdrawToken.ts
 */
async function main() {
    console.log("Withdraw Token")
  
    // Owner
    const owner = await ethers.getNamedSigner('deployer');    

    // Contract
    const treasury = await ethers.getContract<TreasuryV1>('TreasuryV1');

    // Params
    const destination = '' // change this
    const withdrawAmount = ethers.utils.parseUnits('0', 9) // change this

    await treasury.connect(owner).withdrawToken(destination, withdrawAmount)
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
