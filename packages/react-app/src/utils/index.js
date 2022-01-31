export const handleShortenAddress = address => {
  let result = ''
  for (let i = 0; i < address.length; i++) {
    if (i < 5) {
      result += address[i]
    }
    if (i === address.length - 9) {
      result += '...'
    }
    if (i > address.length - 8) {
      result += address[i]
    }
  }
  return result
}
