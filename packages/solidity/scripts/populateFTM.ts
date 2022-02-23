import { network, ethers } from 'hardhat';
import {CommunityOffering } from '@project/contracts/typechain/generated';

/**
 * @dev to run this function :  yarn solidity run-local scripts/populateFTM.ts
 */
async function main() {
    console.log("Populate FTM")

    const destination = await ethers.getNamedSigner('deployer');
    const amountToSend = ethers.utils.parseUnits("8000");
    const user1 = await ethers.getNamedSigner('user11');
    const user2 = await ethers.getNamedSigner('user12');
    const user3 = await ethers.getNamedSigner('user13');
    const user4 = await ethers.getNamedSigner('user14');
    const user5 = await ethers.getNamedSigner('user15');
    const user6 = await ethers.getNamedSigner('user16');
    const user7 = await ethers.getNamedSigner('user17');
    const notInvestor = await ethers.getNamedSigner('notInvestor');

    const FTMHolder = [
      user1,
      user2,
      user3,
      user4,
      user5,
      user6,
      user7,
      notInvestor
    ];
    const sendFTM = FTMHolder.map((holder) => holder.sendTransaction({
      to: destination.address,
      value: amountToSend
    }))
    const executeSendFTM = await Promise.all(sendFTM)

}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
