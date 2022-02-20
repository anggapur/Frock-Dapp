import { utils } from 'ethers';
import { network, ethers } from 'hardhat';
import { DividenDistributorProxy, DividenDistributorV1, FrockProxy, FrockTokenV1, CommunityOffering, FairPriceLaunch } from '@project/contracts/typechain/generated';

/**
 * @dev to run this function :  yarn solidity run-local scripts/checkBalances.ts
 */
async function main() {
  console.log("Check Frock Balances")

  // Accounts
  const deployer = await ethers.getNamedSigner('deployer');
  const marketing = await ethers.getNamedSigner('marketing');
  const treasury = await ethers.getNamedSigner('treasury');
  const user1 = await ethers.getNamedSigner('user1');
  const user2 = await ethers.getNamedSigner('user2');
  const user3 = await ethers.getNamedSigner('user3');
  const user4 = await ethers.getNamedSigner('user4');
  const user5 = await ethers.getNamedSigner('user5');
  const user6 = await ethers.getNamedSigner('user6');  
  // Contracts
  const dividenDistributorProxy = (await ethers.getContract<DividenDistributorProxy>('DividenDistributorProxy'))
    const dividenDistributor = (await ethers.getContract<DividenDistributorV1>('DividenDistributorV1')).attach(dividenDistributorProxy.address)    
  const frockProxy = (await ethers.getContract<FrockProxy>('FrockProxy'))
  const frock = (await ethers.getContract<FrockTokenV1>('FrockTokenV1')).attach(frockProxy.address)         
  const frockDecimals = await frock.decimals();
  const communityOffering = await ethers.getContract<CommunityOffering>(`CommunityOffering`)
  const fairLaunch = await ethers.getContract<FairPriceLaunch>(`FairPriceLaunch`)


  // Check Balances
  console.log(`Frock of Deployer : ${ethers.utils.formatUnits((await frock.balanceOf(deployer.address)), frockDecimals)}`)
  console.log(`Frock of Marketing : ${ethers.utils.formatUnits((await frock.balanceOf(marketing.address)), frockDecimals)}`)
  console.log(`Frock of Treasury : ${ethers.utils.formatUnits((await frock.balanceOf(treasury.address)), frockDecimals)}`)
  console.log(`Frock of Dividen Distributor : ${ethers.utils.formatUnits((await frock.balanceOf(dividenDistributor.address)), frockDecimals)}`)
  console.log(`Frock of Community Sales : ${ethers.utils.formatUnits((await frock.balanceOf(communityOffering.address)), frockDecimals)}`)
  console.log(`Frock of Fair Launch Sales : ${ethers.utils.formatUnits((await frock.balanceOf(fairLaunch.address)), frockDecimals)}`)

}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
