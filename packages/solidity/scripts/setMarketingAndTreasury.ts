import { network, ethers } from 'hardhat';
import { Vault, FrockProxy, FrockTokenV1} from '@project/contracts/typechain/generated';

/**
 * @dev to run this function :  yarn solidity run-local setMarketingAndTreasury.ts
 */
async function main() {
    console.log("Lock Token to Vault")

    // Define Contract
    const frockProxy = (await ethers.getContract<FrockProxy>('FrockProxy'))
    const frock = (await ethers.getContract<FrockTokenV1>('FrockTokenV1')).attach(frockProxy.address)         
    const deployer = await ethers.getNamedSigner('deployer'); // Need to change
    const treasury = await ethers.getNamedSigner('treasury'); // Need to change
    const marketing = await ethers.getNamedSigner('marketing'); // Need to change
    await frock.connect(deployer).setTreasury(treasury.address);
    await frock.connect(deployer).setMarketing(marketing.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
