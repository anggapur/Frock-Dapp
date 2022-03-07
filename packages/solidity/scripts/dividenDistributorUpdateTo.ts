import { utils } from 'ethers';
import { network, ethers } from 'hardhat';
import { DividenDistributorProxy, DividenDistributorV1,  DividenDistributorV2} from '@project/contracts/typechain/generated';

/**
 * @dev to run this function :  yarn solidity run-local scripts/dividenDistributorUpdateTo.ts
 */
async function main() {
    console.log("Flow Local")

    // Accounts
    const deployer = await ethers.getNamedSigner('deployer');

    // Contracts      
    const dividenDistributorProxy = await ethers.getContract<DividenDistributorProxy>('DividenDistributorProxy');
    const dividenDistributorV1 = (await ethers.getContract<DividenDistributorV1>('DividenDistributorV1'))
    const dividenDistributorV2 = (await ethers.getContract<DividenDistributorV1>('DividenDistributorV2'))

    // // Downgrade Back to V1
    // // Upgrade to dividenDistributorV1
    // console.log(`Calling Upgrade To Function to V1`)
    // await dividenDistributorV2
    // .attach(dividenDistributorProxy.address)
    // .connect(deployer)
    // .upgradeTo(dividenDistributorV1.address);

    // Upgrade to V2
    // Upgrade to dividenDistributorV2
    console.log(`Calling Upgrade To Function to V2`)
    await dividenDistributorV1
    .attach(dividenDistributorProxy.address)
    .connect(deployer)
    .upgradeTo(dividenDistributorV2.address);




 

}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
