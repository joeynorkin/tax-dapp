import { useCallback } from 'react'
import {
  API_KEY,
  MAINNET_URL,
  TESTNET_GOERLI_URL,
  TESTNET_SEPOLIA_URL,
} from './etherscanConstants'

const chainIdToUrl: Readonly<Record<string, string>> = {
  '0x1': MAINNET_URL,
  '0x5': TESTNET_GOERLI_URL,
  '0xaa36a7': TESTNET_SEPOLIA_URL,
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
        `${chainIdToUrl[chainId]}/api?${formatParams(params)}&apikey=${API_KEY}`
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
