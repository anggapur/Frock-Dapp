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
    const user1 = await ethers.getNamedSigner('user1');
    const user2 = await ethers.getNamedSigner('user2');
    const user3 = await ethers.getNamedSigner('user3');
    const user4 = await ethers.getNamedSigner('user4');
    const user5 = await ethers.getNamedSigner('user5');
    const user6 = await ethers.getNamedSigner('user6');

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

    // Redeem
    await communityOffering.connect(user1).redeem()
    console.log("User 1 redeemed community sale");
    await communityOffering.connect(user2).redeem()
    console.log("User 2 redeemed community sale");
    await communityOffering.connect(user3).redeem()
    console.log("User 3 redeemed community sale");
    await fairLaunch.connect(user4).redeem()
    console.log("User 4 redeemed public sale");
    await fairLaunch.connect(user5).redeem()
    console.log("User 5 redeemed public sale");
    await fairLaunch.connect(user6).redeem()
    console.log("User 6 redeemed public sale");
    
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
