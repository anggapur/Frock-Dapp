export const GetFantomPrice = async () => {
  const response = await fetch(
    'https://api.coingecko.com/api/v3/simple/price?ids=fantom&vs_currencies=usd',
  );
  const result = await response.json();

  return result.fantom.usd;
};
