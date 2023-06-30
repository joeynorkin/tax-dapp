export const formatBalance = (rawBalance: string) =>
  toEth(rawBalance).toFixed(2)

export const toEth = (wei: string) => parseInt(wei) / 1000000000000000000

export const formatChainAsNum = (chainIdHex: string) => parseInt(chainIdHex)

export const formatAddress = (addr: string) => `${addr.substring(0, 9)}...`

export const formatTimeStamp = (timeStamp: string) =>
  new Date(parseInt(timeStamp) * 1000).toLocaleString()
