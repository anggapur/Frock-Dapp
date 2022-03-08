import { utils } from 'ethers';
import { network, ethers } from 'hardhat';
import { TreasuryV1 } from '@project/contracts/typechain/generated';

/** 
 * @dev to run this function :  yarn solidity run-local scripts/treasury/getBalance.ts
 */
async function main() {
    console.log("Get Balances")
  
    // Owner
    const owner = await ethers.getNamedSigner('deployer');    

    // Contract
    const treasury = await ethers.getContract<TreasuryV1>('TreasuryV1');

    const FTMAmount = await treasury.getBalance();
    const FrockAmount = await treasury.getTokenBalance()

    console.log(`Amount of FTM : ${ethers.utils.formatUnits(FTMAmount, 18)}`)
    console.log(`Amount of FROCK : ${ethers.utils.formatUnits(FrockAmount, 9)}`)
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
