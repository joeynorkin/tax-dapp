import { useCallback } from 'react'

const apiKey = 'RJR6YXMH8V8VJ7IINUMNPP45HIEWY8UP5K'

const mainnetUrl = 'https://api.etherscan.io'
const testnetGoerliUrl = 'https://api-goerli.etherscan.io'
const testnetSepoliaUrl = 'https://api-sepolia.etherscan.io'

const chainIdToUrl: Readonly<Record<string, string>> = {
  '0x1': mainnetUrl,
  '0x5': testnetGoerliUrl,
  '0xaa36a7': testnetSepoliaUrl,
}

type EtherscanResponse<T> = {
  status: string
  message: string
  result: T | string
}

export const useEtherscan = (chainId: string) => {
  const fetchData = useCallback(
    async <T>(params: string[][]) => {
      const response = await fetch(
        `${chainIdToUrl[chainId]}/api?${formatParams(params)}&apikey=${apiKey}`
      )

      const json: EtherscanResponse<T> = await response.json()
      return json
    },
    [chainId]
  )

  return {
    fetchData,
    chainIdNotSupported: !chainIdToUrl[chainId],
  }
}

const formatParams = (params: string[][]) =>
  params.map(([key, value]) => `${key}=${value}`).join('&')
