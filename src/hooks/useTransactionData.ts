import { useCallback, useEffect, useState } from 'react'

export const useTransactionData = (address: string, chainId: string) => {

  const [ transactionDate, setTransactionDate ] = useState('')
  const [ transactionDateExists, setTransactionDateExists ] = useState(false)
  const [ loading, setLoading ] = useState(true)
  const [ error, setError ] = useState(true)

  const apiKey = 'RJR6YXMH8V8VJ7IINUMNPP45HIEWY8UP5K'

  const mainnetUrl = 'https://api.etherscan.io'
  const testnetSepoliaUrl = 'https://api-sepolia.etherscan.io'
  const testnetGoerliUrl = 'https://api-sepolia.etherscan.io'

  const chainIdToUrl: Readonly<Record<string, string>> = {
    '0x1': mainnetUrl,
    '0x5': testnetGoerliUrl,
    '0xaa36a7': testnetSepoliaUrl,
  }

  const fetchTransaction = useCallback(async () => {
    setLoading(true)
    setError(false)

    if (address === '' || !chainIdToUrl[chainId]) {
      return;
    }

    const response = await fetch(
      `${chainIdToUrl[chainId]}/api?module=account&action=txlist&address=${address}&startblock=0&endblock=99999999&page=1&offset=10&sort=asc&apikey=${apiKey}`
    )

    const jsonResponse = await response.json()

    if (jsonResponse.message === 'NOTOK') {
      setTransactionDateExists(false)
      setLoading(false)
      setError(true)
      return
    }

    if (jsonResponse.message !== 'OK') {
      setTransactionDateExists(false)
      setLoading(false)
      return
    }

    setTransactionDateExists(true)
    setTransactionDate(formatTimeStamp(jsonResponse.result[0].timeStamp))
    setLoading(false)

  }, [address, chainId])

  useEffect(() => {
    fetchTransaction()
  }, [fetchTransaction])

  return {
    transactionDate,
    transactionDateExists,
    loading,
    error,
    chainIdNotSupported: !chainIdToUrl[chainId]
  }
}

const formatTimeStamp = (timeStamp: string) => {
  return new Date(parseInt(timeStamp) * 1000).toDateString();
}