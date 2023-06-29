export const formatBalance = (rawBalance: string) =>
  (parseInt(rawBalance) / 1000000000000000000).toFixed(3)

export const formatChainAsNum = (chainIdHex: string) => parseInt(chainIdHex)

export const formatAddress = (addr: string) => `${addr.substring(0, 9)}...`

export const formatTimeStamp = (timeStamp: string) =>
  new Date(parseInt(timeStamp) * 1000).toDateString()
