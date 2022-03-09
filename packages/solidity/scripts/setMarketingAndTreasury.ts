import { network, ethers } from 'hardhat';
import { Vault, FrockProxy, FrockTokenV1} from '@project/contracts/typechain/generated';

/**
 * @dev to run this function :  yarn solidity run-local setMarketingAndTreasury.ts
 */
async function main() {
    console.log("Set Marketing and/or Treasury contracts")

    // Define Contract
    const frockProxy = (await ethers.getContract<FrockProxy>('FrockProxy'))
    const frock = (await ethers.getContract<FrockTokenV1>('FrockTokenV1')).attach(frockProxy.address)         
    const deployer = await ethers.getNamedSigner('deployer'); // Need to change
    const treasuryContract = await ethers.getNamedSigner('treasuryContract'); // Need to change
    const marketing = await ethers.getNamedSigner('marketing'); // Need to change
    await frock.connect(deployer).setTreasury(treasuryContract.address);
    await frock.connect(deployer).setMarketing(marketing.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
