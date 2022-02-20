import { network, ethers, deployments } from 'hardhat';
import { CommunityOffering, FairPriceLaunch, FrockProxy, FrockTokenV1 } from '@project/contracts/typechain/generated';

/**
 * @dev to run this function :  yarn solidity run-local scripts/setLaunchToken.ts
 */
async function main() { 

    // Acccounts
    const deployer = await ethers.getNamedSigner('deployer');    

    // Contract
    const communityOffering = await ethers.getContract<CommunityOffering>(`CommunityOffering`) 
    const fairLaunch = await ethers.getContract<FairPriceLaunch>(`FairPriceLaunch`) 
    const frockProxy = (await ethers.getContract<FrockProxy>('FrockProxy'))    
    const frock = (await ethers.getContract<FrockTokenV1>('FrockTokenV1')).attach(frockProxy.address)   

    // Set Token Launch
    await communityOffering.connect(deployer).setLaunchToken(frockProxy.address)
    await fairLaunch.connect(deployer).setLaunchToken(frockProxy.address)   
    
    // Exclude Community and Fair Launch from fee
    if(!(await frock.isExcludedFromFees(communityOffering.address))) {
      await frock.connect(deployer).excludeFromFees(communityOffering.address, true)
    }      

    if(!(await frock.isExcludedFromFees(fairLaunch.address))) {
      await frock.connect(deployer).excludeFromFees(fairLaunch.address, true)
    }      
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
