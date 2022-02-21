import { utils } from 'ethers';
import { network, ethers } from 'hardhat';
import { WFTM, SpookyFactory, SpookyRouter, FrockProxy, FrockTokenV1 } from '@project/contracts/typechain/generated';

/**
 * @dev to run this function :  yarn solidity run-local scripts/swapFTMtoFrock.ts
 */
async function main() {
  console.log("Swap Frock to FTM")

  // You can change this
  const swapper = await ethers.getNamedSigner('deployer');    
  const amountFTMToSwap = ethers.utils.parseUnits("100", 18)  
  
  // Contracts  
  const dexRouter = await ethers.getContract<SpookyRouter>('SpookyRouter');
  const frockProxy = await ethers.getContract<FrockProxy>('FrockProxy');
  const frock = (await ethers.getContract<FrockTokenV1>('FrockTokenV1')).attach(frockProxy.address);  
  const WFTMToken = await ethers.getContract<WFTM>('WFTM');
    
  
  // Swap Frock to FTM
  const currentTimestamp = (await ethers.provider.getBlock("latest")).timestamp        
  await dexRouter.connect(swapper).swapExactETHForTokensSupportingFeeOnTransferTokens(
    0,
    [WFTMToken.address,frock.address],
    swapper.address,
    currentTimestamp+1000000, 
    {
      value: amountFTMToSwap
    }
  );
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
