export const formatBalance = (rawBalance: string) => {
  return (parseInt(rawBalance) / 1000000000000000000).toFixed(3)
}

export const formatChainAsNum = (chainIdHex: string) => {
  return parseInt(chainIdHex)
}

export const formatAddress = (addr: string) => {
  return `${addr.substring(0, 9)}...`
}