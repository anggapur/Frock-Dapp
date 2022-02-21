import { utils } from 'ethers';
import { network, ethers } from 'hardhat';
import { WFTM, SpookyFactory, SpookyRouter, FrockProxy, FrockTokenV1 } from '@project/contracts/typechain/generated';

/**
 * @dev to run this function :  yarn solidity run-local scripts/addLiquidity.ts
 */
async function main() {
  console.log("Add Liquidity")

  // Liquidity Provider, You can change this to account that wanna be liquidity Provider
  // Liquidity Provider must have both of the tokens
  // You can change this
  const liquidityProvider = await ethers.getNamedSigner('deployer');    
  const amountFrockToAdd = ethers.utils.parseUnits("100", 9)
  const amountFTMToAdd = ethers.utils.parseUnits("100", 18)
  
  // Contracts  
  const dexRouter = await ethers.getContract<SpookyRouter>('SpookyRouter');
  const frockProxy = await ethers.getContract<FrockProxy>('FrockProxy');
  const frock = (await ethers.getContract<FrockTokenV1>('FrockTokenV1')).attach(frockProxy.address);  
  

  // Approve Frock Tokens
  await frock.connect(liquidityProvider).approve(dexRouter.address, amountFrockToAdd);
  
  // Add Liquidity
  const currentTimestamp = (await ethers.provider.getBlock("latest")).timestamp        
  await dexRouter.connect(liquidityProvider).addLiquidityETH(
    frock.address,
    amountFrockToAdd,
    amountFrockToAdd,
    amountFTMToAdd,
    liquidityProvider.address,
    currentTimestamp+1000000, 
    {
      value: amountFTMToAdd
    }
  );

}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
