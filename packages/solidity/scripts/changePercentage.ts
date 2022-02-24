import { network, ethers } from 'hardhat';
import { SpookyRouter, SpookyFactory, FrockProxy, FrockTokenV1 } from '@project/contracts/typechain/generated';

/**
 * @dev to run this function :  yarn solidity run-local scripts/createPool.ts
 * @dev Remember to share FROCK or make sure the poolCreator have FOCK before running this scripts
 */
async function main() {
    console.log("Change Percentage")

    const deployer = await ethers.getNamedSigner('deployer');
    const frockProxy = (await ethers.getContract<FrockProxy>('FrockProxy'))
    const frock = (await ethers.getContract<FrockTokenV1>('FrockTokenV1')).attach(frockProxy.address)         
  
    await frock.connect(deployer).setPercentage(700,1400,100); // 7% reflection, 14% treasury, 1% Marketing
    
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
