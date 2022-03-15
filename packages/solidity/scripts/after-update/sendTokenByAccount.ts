import { network, ethers } from 'hardhat';
import { DividenDistributorProxy, DividenDistributorV2, FrockProxy, FrockTokenV1 } from '@project/contracts/typechain/generated';

/**
 * @dev to run this function :  yarn solidity run-local scripts/after-update/sendTokenByAccount.ts
 * @deb Send Token by Named Accounts
 */
async function main() {
    console.log("Send Frock Token by Named Acounts")
    
    const frockHolder = await ethers.getNamedSigner('frockHolder4');  // Change this 
    // Dividen Distributor : 0x3e3C787744449fbe4fC275d48d8adDd642c482ae
    const recepient = '0x3e3C787744449fbe4fC275d48d8adDd642c482ae' // Change this
    const transferAmount = ethers.utils.parseUnits('1000',9); // CHange this
    
    const frockProxy = (await ethers.getContract<FrockProxy>('FrockProxy'))    
    const frock = (await ethers.getContract<FrockTokenV1>('FrockTokenV1')).attach(frockProxy.address)      
    
    console.log((await frock.connect(frockHolder).balanceOf(recepient)).toString())
    
    await frock.connect(frockHolder).transfer(recepient, transferAmount);
    

}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
