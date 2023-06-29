import { useCallback } from "react"

const apiKey = 'RJR6YXMH8V8VJ7IINUMNPP45HIEWY8UP5K'

const mainnetUrl = 'https://api.etherscan.io'
const testnetSepoliaUrl = 'https://api-sepolia.etherscan.io'
const testnetGoerliUrl = 'https://api-sepolia.etherscan.io'

const chainIdToUrl: Readonly<Record<string, string>> = {
  '0x1': mainnetUrl,
  '0x5': testnetGoerliUrl,
  '0xaa36a7': testnetSepoliaUrl,
}

export const useEtherscan = (chainId: string) => {

  const fetchData = useCallback(async (params: string[][]) => {
    const response = await fetch(`${chainIdToUrl[chainId]}/api?${toParamsString(params)}&apikey=${apiKey}`)
    return await response.json()
  }, [chainId])

  return {
    fetchData,
    chainIdNotSupported: !chainIdToUrl[chainId]
  }
}

const toParamsString = (params: string[][]) => params.map(([ key, value ]) => `${key}=${value}`).join('&')