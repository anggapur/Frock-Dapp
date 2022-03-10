const { ethers } = require("ethers");
const {
  DefenderRelaySigner,
  DefenderRelayProvider,
} = require("defender-relay-client/lib/ethers");
const { abi: treasuryAbi, address: treasuryAddress } = require("./abi/TreasuryV1.json");

async function swapAndSend(payload, signer) {
  console.log("Swap and Send");
  // Contract   
  const treasury = new ethers.Contract(treasuryAddress, treasuryAbi, signer)

  // Variables
  const minimumTokenToSwap = parseInt(ethers.utils.parseUnits("100", 9))
  const fixedLimitTokenToSwap = parseInt(ethers.utils.parseUnits("500", 9))
  const getTokenBalance = parseInt(await treasury.getTokenBalance())

  console.log(`minimumTokenToSwap : ${minimumTokenToSwap}`)
  console.log(`fixedLimitTokenToSwap : ${fixedLimitTokenToSwap}`)
  console.log(`getTokenBalance : ${getTokenBalance}`)

  if(getTokenBalance > minimumTokenToSwap && getTokenBalance >= fixedLimitTokenToSwap) {
    console.log("Calling swapAndSend")
    await treasury.connect(signer).swapAndSend()
  } else {
    console.log("Not Calling swapAndSend")    
  }

  
}

// Entrypoint for the Autotask
exports.handler = async function (event) {
  // Setup Relayer
  const provider = new DefenderRelayProvider(event);
  const signer = new DefenderRelaySigner(event, provider, { speed: "fastest" });
  await swapAndSend(event, signer);
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
