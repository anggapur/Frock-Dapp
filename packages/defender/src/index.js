const { ethers } = require("ethers");
const {
  DefenderRelaySigner,
  DefenderRelayProvider,
} = require("defender-relay-client/lib/ethers");
const { address: dividenDistributorAddress } = require("./abi/DividenDistributorProxy.json");
const { abi: dividenDistributorAbi } = require("./abi/DividenDistributorV1.json");
const { address: frockAddress } = require("./abi/FrockProxy.json");
const { abi: frockAbi } = require("./abi/FrockTokenV1.json");

async function swapAndShareReward(payload, signer) {
  console.log("Start Swap FROCK & Share Reward");
  // Contract
  const frock = new ethers.Contract(frockAddress, frockAbi, signer);
  const dividenDistributor = new ethers.Contract(dividenDistributorAddress, dividenDistributorAbi, signer);
  // Check Balance & Minimum Balance  
  const balanceOfDividenDistributor = await frock.connect(signer).balanceOf("0x3e3C787744449fbe4fC275d48d8adDd642c482ae");
  const minimumFrockToSwap = await dividenDistributor.connect(signer).minimumFrockToSwap();  

  if(balanceOfDividenDistributor >= minimumFrockToSwap) {
    console.log("Reach Minimum Requirement")
    const tx = await dividenDistributor.connect(signer).swapAndShareReward();
    return {
      hash: tx.hash,
      transactionId: tx.transactionId,
    }
  } else {
    console.log("Not Reaching Minimum Requirement")
    return {
      hash: 0,
      transactionId:0,
    }
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
