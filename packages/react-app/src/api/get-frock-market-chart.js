// eslint-disable-next-line arrow-body-style
export const GetFrockMarketChart = async () => {
  // TODO: will delete after frock already exists on coingecko
  return { market_caps: [[140837287, 3947383]] };

  // TODO: will uncomment after frock already exists on coingecko
  // const response = await fetch(
  //   'https://api.coingecko.com/api/v3/coins/frock/market_chart?vs_currency=usd&days=1',
  // );
  // const result = await response.json();

  // return result;
};
