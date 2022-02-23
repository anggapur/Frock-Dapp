import { network, ethers, deployments } from 'hardhat';
import { FrockProxy, FrockTokenV1 } from '@project/contracts/typechain/generated';

/**
 * @dev to run this function :  yarn solidity run-local scripts/setExcludedFromFee.ts
 */
async function main() { 

    // Acccounts
    const deployer = await ethers.getNamedSigner('deployer');
    const frockProxy = (await ethers.getContract<FrockProxy>('FrockProxy'))    
    const frock = (await ethers.getContract<FrockTokenV1>('FrockTokenV1')).attach(frockProxy.address)

    const communityOffering = await ethers.getContract<CommunityOffering>(`CommunityOffering`)
    const fairLaunch = await ethers.getContract<FairPriceLaunch>(`FairPriceLaunch`)
    const marketing = await ethers.getNamedSigner('marketing');
    const treasury = await ethers.getNamedSigner('treasury');
    const team = await ethers.getNamedSigner('team');


    // Exclude From Fee
    await frock.connect(deployer).excludeFromFees(communityOffering.address, true) //community launch contract
    console.log("communityOffering contract excluded from fees");
    await frock.connect(deployer).excludeFromFees(fairLaunch.address, true) //fair launch contract
    console.log("fairLaunch contract excluded from fees");
    await frock.connect(deployer).excludeFromFees(treasury.address, true) //treasury
    console.log("treasury excluded from fees");
    await frock.connect(deployer).excludeFromFees(marketing.address, true) //marketing
    console.log("marketing  excluded from fees");
    await frock.connect(deployer).excludeFromFees(team.address, true) //team
    console.log("team excluded from fees");
    await frock.connect(deployer).excludeFromFees('0x3e3C787744449fbe4fC275d48d8adDd642c482ae', true) //dividend distributor
    console.log("dividend distributor excluded from fees");


}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
