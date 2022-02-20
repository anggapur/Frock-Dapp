import { network, ethers, deployments } from 'hardhat';
import { FrockProxy, FrockTokenV1 } from '@project/contracts/typechain/generated';

/**
 * @dev to run this function :  yarn solidity run-local scripts/setExcludedFromFee.ts --address [address]
 */
async function main() { 

    var args = process.argv.slice(2);
    const address = args[1];
    
    // Acccounts
    const deployer = await ethers.getNamedSigner('deployer');
    const frockProxy = (await ethers.getContract<FrockProxy>('FrockProxy'))    
    const frock = (await ethers.getContract<FrockTokenV1>('FrockTokenV1')).attach(frockProxy.address)      

    // Exclude From Fee
    await frock.connect(deployer).excludeFromFees(address, true)
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
