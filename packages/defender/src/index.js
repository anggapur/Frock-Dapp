const { ethers } = require("ethers");
const {
  DefenderRelaySigner,
  DefenderRelayProvider,
} = require("defender-relay-client/lib/ethers");
const { address: dividenDistributorAddress } = require("./abi/DividenDistributorProxy.json");
const { abi: dividenDistributorAbi } = require("./abi/DividenDistributorV1.json");

async function swapAndShareReward(payload, signer) {
  console.log("Start Swap FROCK & Share Reward");
  const dividenDistributor = new ethers.Contract(dividenDistributorAddress, dividenDistributorAbi, signer);
  const tx = await dividenDistributor.connect(signer).swapAndShareReward();
  console.log("End Swap FROCK & Share Reward");
  return {
    hash: tx.hash,
    transactionId: tx.transactionId,
  }
}

// Entrypoint for the Autotask
exports.handler = async function (event) {
  // Setup Relayer
  const provider = new DefenderRelayProvider(event);
  const signer = new DefenderRelaySigner(event, provider, { speed: "fastest" });
  await swapAndShareReward(event, signer);
};


// To run locally (this code will not be executed in Autotasks)
// RUn via node ....
if (require.main === module) {
  require("dotenv").config();
  const {
    API_KEY: apiKey,
    API_SECRET: apiSecret,   
  } = process.env;
  exports
    .handler({
      apiKey,
      apiSecret,            
    })
    .then(() => process.exit(0))
    .catch((error) => {
      console.error(error);
      process.exit(1);
    });
}
