import { utils } from 'ethers';
import { network, ethers } from 'hardhat';
import { WFTM, SpookyFactory, SpookyRouter, FrockProxy, FrockTokenV1 } from '@project/contracts/typechain/generated';

/**
 * @dev to run this function :  yarn solidity run-local scripts/getPriceFromDex.ts
 */
async function main() {
    console.log("Create Liquidity Pool FrockxFTM")

    // Accounts  
    const liquidityProvider = await ethers.getNamedSigner('deployer');    
    const frockAmount = ethers.utils.parseUnits("9000", 9)
    const ftmAmount = ethers.utils.parseUnits("9000", 18)

    // Contracts
    const pancakeFactory = await ethers.getContract<SpookyFactory>('SpookyFactory');
    const pancakeRouter = await ethers.getContract<SpookyRouter>('SpookyRouter');
    const frockProxy = await ethers.getContract<FrockProxy>('FrockProxy');
    const frock = (await ethers.getContract<FrockTokenV1>('FrockTokenV1')).attach(frockProxy.address);
    const WFTMToken = await ethers.getContract<WFTM>('WFTM');

    // Get Price
    const oneFrock = ethers.utils.parseUnits("1", 9);
    const priceOfFrock = await pancakeRouter.getAmountsOut(
        oneFrock, 
        [frock.address, WFTMToken.address]
    )
    console.log(`Frock to FTM : ${ethers.utils.formatUnits(priceOfFrock[1])}`)
    // console.log(`Price of Frock => ${ethers.utils.formatUnits(priceOfFrock, 18)} FTM`)



  
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
