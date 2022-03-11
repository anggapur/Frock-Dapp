import { utils } from 'ethers';
import { network, ethers } from 'hardhat';
import { TreasuryV1 } from '@project/contracts/typechain/generated';

/**
 * @dev to run this function :  yarn solidity run-local scripts/treasury/assignRole.ts
 */
async function main() {
    console.log("Assign Role")
  
    // Owner
    const owner = await ethers.getNamedSigner('deployer');    
    // Contract
    const treasury = await ethers.getContract<TreasuryV1>('TreasuryV1');

    const account_address = '0x131ee8f328f67254276b78d682893b792f889a00'; // Change This
    const CALLER_ROLE = await treasury.CALLER_ROLE();
    const ADMIN_ROLE = await treasury.DEFAULT_ADMIN_ROLE();    
    const ROLE = CALLER_ROLE // Change this
    
    
    await treasury.connect(owner).grantRole(ROLE, account_address)
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
