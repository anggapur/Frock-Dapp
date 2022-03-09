const { ethers } = require("ethers");
const { DefenderRelaySigner, DefenderRelayProvider } = require("defender-relay-client/lib/ethers");
const { address: dividenDistributorAddress } = require("./abi/DividenDistributorProxy.json");
const { abi: dividenDistributorAbi } = require("./abi/DividenDistributorV1.json");
const { createClient } = require("@supabase/supabase-js");

require("dotenv").config();

async function getRewards(payload, signer, SUPABASE_API_KEY_WRITE, SUPABASE_URL) {

  // console.log(SUPABASE_URL);
  const Supabase = createClient(SUPABASE_URL, SUPABASE_API_KEY_WRITE);

  console.log("Start Get Reward");

  // Contract
  const dividenDistributor = new ethers.Contract(
    dividenDistributorAddress,
    dividenDistributorAbi,
    signer
  );

  let { data, error } = await Supabase.from("reward_distributions")
      .select("current_reward_id")
      .order("id", { ascending: false })
      .limit(1);
  if (error) {
    console.error(error.message);
    return false;
  }

  if (!Array.isArray(data)) {
    console.error('Data from Supabase is not an array');
    return false;
  }

  let currentRewardId = 0;
  if (data[0] && data[0].current_reward_id) {
    currentRewardId = Number(data[0].current_reward_id);
  }
  console.log("The last ID in the Supabase: "+currentRewardId);

  // get latest reward
  const newRewardId = currentRewardId + 1;
  const reward = await dividenDistributor.connect(signer).rewards(newRewardId);
  const rewardAmount = ethers.utils.formatUnits(reward[0]);
  const totalClaimed = ethers.utils.formatUnits(reward[1]);
  const issuedAt = ethers.utils.formatUnits(reward[2], 0);
  const snapshotId = ethers.utils.formatUnits(reward[3], 0);
  const totalExcludedFromDistribution = ethers.utils.formatUnits(reward[4], 9);
  const rewardSource = reward[5];


  if (rewardAmount == "0.0" && totalClaimed == "0.0") {
    console.log("No new Rewards Distribution available in contract");
  } else {
    console.log("New Rewards Distribution found, inserting in Supabase");
    const { data, error } = await Supabase.from("reward_distributions").insert([
      {
        reward_amount: rewardAmount,
        total_claimed: totalClaimed,
        issued_at: issuedAt,
        snapshot_id: snapshotId,
        total_excluded_from_distribution: totalExcludedFromDistribution,
        reward_source: rewardSource,
        current_reward_id: newRewardId,
      },
    ]);
    if (error) {
      console.error(error);
      return false;
    }
  }


  console.log("Finish Get Reward");

  return {
    rewardAmount,
    totalClaimed,
    issuedAt,
    snapshotId,
    totalExcludedFromDistribution,
    rewardSource,
  };
}

// Entrypoint for the Autotask
exports.handler = async function (event) {
  const { SUPABASE_API_KEY_WRITE, SUPABASE_URL } = event.secrets;
  // Setup Relayer
  const provider = new DefenderRelayProvider(event);
  const signer = new DefenderRelaySigner(event, provider, { speed: "fastest" });
  await getRewards(event, signer, SUPABASE_API_KEY_WRITE, SUPABASE_URL);
};

// To run locally (this code will not be executed in Autotasks)
// RUn via node ....
if (require.main === module) {
  require("dotenv").config();
  const { API_KEY: apiKey, API_SECRET: apiSecret } = process.env;
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
