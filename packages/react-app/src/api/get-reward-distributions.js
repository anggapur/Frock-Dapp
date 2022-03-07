export const GetRewardDistributions = async () => {
  const response = await fetch('/.netlify/functions/reward-distributions');
  const result = await response.json();

  return result;
};
