import { network, ethers, deployments } from 'hardhat';
import { CommunityOffering, FrockProxy, FrockTokenV1, FairPriceLaunch } from '@project/contracts/typechain/generated';

/**
 * @dev to run this function :  yarn solidity run-local scripts/distributeFrockToken.ts
 */
async function main() {   
    console.log("Distribute Frock Token to Community Contract, Fair Launch Contract & Team Address");

    // Acccounts
    const deployer = await ethers.getNamedSigner('deployer');
    const team = await ethers.getNamedSigner('team');
    
    // Contract
    const communityOffering = await ethers.getContract<CommunityOffering>(`CommunityOffering`) 
    const fairLaunch = await ethers.getContract<FairPriceLaunch>(`FairPriceLaunch`)
    const frockProxy = (await ethers.getContract<FrockProxy>('FrockProxy'))
    const frock = (await ethers.getContract<FrockTokenV1>('FrockTokenV1')).attach(frockProxy.address)
    const frockDecimals = await frock.decimals();         

    // Send Token    
    await frock.connect(deployer).transfer(fairLaunch.address, ethers.utils.parseUnits("350000", frockDecimals))
    await frock.connect(deployer).transfer(communityOffering.address, ethers.utils.parseUnits("125000", frockDecimals))
    await frock.connect(deployer).transfer(team.address, ethers.utils.parseUnits("125000", frockDecimals))
        
    
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
