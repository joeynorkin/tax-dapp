import { useCallback, useEffect, useState } from 'react'

import { formatTimeStamp } from '~/utils'
import { useEtherscan } from './useEtherscan'

type Transaction = {
  blockHash: string
  blockNumber: string
  confirmations: string
  contractAddress: string
  cumulativeGasUsed: string
  from: string
  functionName: string
  gas: string
  gasPrice: string
  gasUsed: string
  hash: string
  input: string
  isError: string
  methodId: string
  nonce: string
  timeStamp: string
  to: string
  transactionIndex: string
  txreceipt_status: string
  value: string
}

export const useTransactionData = (address: string, chainId: string) => {
  const [transactionDate, setTransactionDate] = useState('')
  const { fetchData, chainIdNotSupported } = useEtherscan(chainId)

  const params = [
    ['module', 'account'],
    ['action', 'txlist'],
    ['address', address],
    ['startblock', '0'],
    ['endblock', '99999999'],
    ['page', '1'],
    ['offset', '10'],
    ['sort', 'asc'],
  ]

  const fetchLatestTransactionDate = useCallback(async () => {
    if (chainIdNotSupported) {
      return
    }

    const response = await fetchData<Transaction[]>(params)

    if (typeof response.result === 'string') {
      if (response.result === 'Max rate limit reached') {
        // setMaxLimitReached(true)
      } else {
        // setError(true)
      }
      return
    }

    if (response.message !== 'OK') {
      // setError(true)
      return
    }

    const tx = response.result[0]

    setTransactionDate(formatTimeStamp(tx.timeStamp))
  }, [address, chainId])

  useEffect(() => {
    fetchLatestTransactionDate()
  }, [fetchLatestTransactionDate])

  return {
    transactionDate,
    transactionDateExists: !!transactionDate,
    chainIdNotSupported,
  }
}
