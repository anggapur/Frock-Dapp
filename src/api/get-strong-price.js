export const GetStrongPrice = async () => {
  const response = await fetch(
    'https://api.coingecko.com/api/v3/simple/price?ids=strong&vs_currencies=usd'
  )
  const result = await response.json()

  return result.strong.usd
}
