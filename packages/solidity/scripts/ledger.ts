import { network, ethers } from 'hardhat';
import { LedgerSigner } from "@ethersproject/hardware-wallets"

/**
 * @dev to run this function :  yarn solidity run-local ledger.ts
 * @deb Make sure Dividen Contract have Frock before running this function
 */
async function main() {
    
    const ledger = await new LedgerSigner(ethers.provider, "hid", "m/44'/60'/0'/0");    
    console.log("ledger :", await ledger.getAddress())
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
