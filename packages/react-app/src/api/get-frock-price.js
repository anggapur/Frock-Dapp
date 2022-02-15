// eslint-disable-next-line arrow-body-style
export const GetFrockPrice = async () => {
  // TODO: will delete after frock already exists on coingecko
  return 0.3947;

  // TODO: will uncomment after frock already exists on coingecko
  // const response = await fetch(
  //   'https://api.coingecko.com/api/v3/simple/price?ids=frock&vs_currencies=usd',
  // );
  // const result = await response.json();

  // return result.frock.usd;
};
