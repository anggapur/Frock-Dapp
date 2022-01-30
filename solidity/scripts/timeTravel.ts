import { network } from 'hardhat';

async function main() {
  await network.provider.send('evm_setNextBlockTimestamp', [0]);
  await network.provider.send('evm_mine');
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
