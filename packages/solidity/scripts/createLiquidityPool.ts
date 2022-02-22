import { utils } from 'ethers';
import { network, ethers } from 'hardhat';
import { WFTM, SpookyFactory, SpookyRouter, FrockProxy, FrockTokenV1 } from '@project/contracts/typechain/generated';

/**
 * @dev to run this function :  yarn solidity run-local scripts/createLiquidityPool.ts
 */
async function main() {
  console.log("Create Liquidity Pool FrockxFTM")

  // Accounts  
  const liquidityProvider = await ethers.getNamedSigner('deployer');
  const frockAmount = ethers.utils.parseUnits("400000", 9)
  const ftmAmount = ethers.utils.parseUnits("3700", 18)

  // Contracts
  const pancakeFactory = await ethers.getContract<SpookyFactory>('SpookyFactory');
  const pancakeRouter = await ethers.getContract<SpookyRouter>('SpookyRouter');
  const frockProxy = await ethers.getContract<FrockProxy>('FrockProxy');
  const frock = (await ethers.getContract<FrockTokenV1>('FrockTokenV1')).attach(frockProxy.address);
  const WFTMToken = await ethers.getContract<WFTM>('WFTM');
  

  // Create Liquidity Pool
  await pancakeFactory.connect(liquidityProvider).createPair(frock.address, WFTMToken.address); 
  const pairAddress = await pancakeFactory.getPair(frock.address, WFTMToken.address);
  console.log(`pairAddress : ${pairAddress}`);
    

  // Add Liquidity
  const currentTimestamp = (await ethers.provider.getBlock("latest")).timestamp        
  await frock.connect(liquidityProvider).approve(pancakeRouter.address, frockAmount);
  await WFTMToken.connect(liquidityProvider).deposit({
    value: ftmAmount
  });
  await WFTMToken.connect(liquidityProvider).approve(pancakeRouter.address, ftmAmount);
  await pancakeRouter.connect(liquidityProvider).addLiquidity(
      frock.address, WFTMToken.address,
      frockAmount, ftmAmount,
      ethers.BigNumber.from("0"),ethers.BigNumber.from("0"), 
      liquidityProvider.address, 
      currentTimestamp+1000000
  )
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
