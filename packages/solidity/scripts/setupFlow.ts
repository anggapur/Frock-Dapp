import { network, ethers, deployments } from 'hardhat';
import { CommunityOffering, USDC, FairPriceLaunch } from '@project/contracts/typechain/generated';

/**
 * @dev to run this function :  yarn solidity run-local scripts/setupFlow.ts
 */
async function main() { 

    // Acccounts
    const deployer = await ethers.getNamedSigner('deployer');
    const user1 = await ethers.getNamedSigner('user1');
    const user2 = await ethers.getNamedSigner('user2');
    const user3 = await ethers.getNamedSigner('user3');
    const user4 = await ethers.getNamedSigner('user4');
    const user5 = await ethers.getNamedSigner('user5');
    const user6 = await ethers.getNamedSigner('user6');

    // Contract
    const communityOffering = await ethers.getContract<CommunityOffering>(`CommunityOffering`) 
    const fairLaunch = await ethers.getContract<FairPriceLaunch>(`FairPriceLaunch`)
    const usdcFtm = await deployments.get('USDC')      
    const usdc = (await ethers.getContract<USDC>(`USDC`)).attach(
    usdcFtm.address
    ) as USDC;      
    const usdcDecimals = await usdc.decimals();        

    // COMMUNITY SALES

    // Whitelist
    await communityOffering.connect(deployer).addWhitelist(user1.address)
    await communityOffering.connect(deployer).addWhitelist(user2.address)
    await communityOffering.connect(deployer).addWhitelist(user3.address)    
    
    // Enable the sales
    await communityOffering.connect(deployer).enableSale()
    
    // Time Travel to start sales
    await network.provider.send('evm_setNextBlockTimestamp', [1644681601]);
    await network.provider.send('evm_mine');        
    
    // Users Invest 
    await usdc.connect(user1).approve(communityOffering.address, ethers.utils.parseUnits("100", usdcDecimals))
    await usdc.connect(user2).approve(communityOffering.address, ethers.utils.parseUnits("100", usdcDecimals))
    await usdc.connect(user3).approve(communityOffering.address, ethers.utils.parseUnits("100", usdcDecimals))
    await communityOffering.connect(user1).invest(ethers.utils.parseUnits("100", usdcDecimals))
    await communityOffering.connect(user2).invest(ethers.utils.parseUnits("100", usdcDecimals))
    await communityOffering.connect(user3).invest(ethers.utils.parseUnits("100", usdcDecimals))

    // Enable Redeem
    await communityOffering.connect(deployer).enableRedeem()


    
    // PUBLIC SALES

    // Enable the sales
    await fairLaunch.connect(deployer).enableSale()

    // Time Travel
    await network.provider.send('evm_setNextBlockTimestamp', [1645286401]);
    await network.provider.send('evm_mine');        

    // Users Invest 
    await usdc.connect(user4).approve(fairLaunch.address, ethers.utils.parseUnits("2500", usdcDecimals))  
    await usdc.connect(user5).approve(fairLaunch.address, ethers.utils.parseUnits("2500", usdcDecimals))  
    await usdc.connect(user6).approve(fairLaunch.address, ethers.utils.parseUnits("2500", usdcDecimals))  
    await fairLaunch.connect(user4).invest(ethers.utils.parseUnits("2500", usdcDecimals))
    await fairLaunch.connect(user5).invest(ethers.utils.parseUnits("2500", usdcDecimals))
    await fairLaunch.connect(user6).invest(ethers.utils.parseUnits("2500", usdcDecimals))

    // Enable Claim
    await fairLaunch.connect(deployer).enableClaim()

    // Time Travel to end of Public Sales
    await network.provider.send('evm_setNextBlockTimestamp', [1645459201]);
    await network.provider.send('evm_mine');        

    // Users Claim 
    await fairLaunch.connect(user4).claimRedeemable()
    await fairLaunch.connect(user5).claimRedeemable()
    await fairLaunch.connect(user6).claimRedeemable()

    // Enable Redeem
    await fairLaunch.connect(deployer).enableRedeem();
    
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
