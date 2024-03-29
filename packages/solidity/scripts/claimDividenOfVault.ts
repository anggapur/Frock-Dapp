import { network, ethers } from 'hardhat';
import { Vault, FrockProxy, FrockTokenV1} from '@project/contracts/typechain/generated';

/**
 * @dev to run this function :  yarn solidity run-local scripts/claimDividenOfVault.ts
 */
async function main() {
    console.log("Claim Dividen owned by Vault")

    // Define Contract
    const frockProxy = (await ethers.getContract<FrockProxy>('FrockProxy'))
    const frock = (await ethers.getContract<FrockTokenV1>('FrockTokenV1')).attach(frockProxy.address)         
    const vault = await ethers.getContract<Vault>('Vault')
    const frockDecimals = await frock.decimals()

    console.log("Start Time : ", await vault.startLock())

    // Parameters    
    const rewardId = 0;
    const user = await ethers.getNamedSigner('user1'); // Need to change

    // Lock Token
    await vault.connect(user).claimDividen(rewardId);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
