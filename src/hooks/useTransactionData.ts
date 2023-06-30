import { useCallback, useEffect, useState } from 'react'

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

// TODO: expose functions to update transaction: most recent recieved?
// should we cache transaction data?
export const useTransactionData = (address: string, chainId: string) => {
  const [transaction, setTransaction] = useState<Transaction>({} as Transaction)
  const [transactionRetrieved, setTransactionRetrieved] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
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

  const fetchLatestTransaction = useCallback(async () => {
    if (chainIdNotSupported) {
      return
    }

    const response = await fetchData<Transaction[]>(params)

    if (typeof response.result === 'string') {
      setErrorMessage(response.result)
      return
    }

    if (response.message !== 'OK') {
      setErrorMessage(response.message)
      return
    }

    const tx = response.result[0]
    setTransaction(tx)
    setTransactionRetrieved(true)
  }, [address, chainId])

  useEffect(() => {
    fetchLatestTransaction()
  }, [fetchLatestTransaction])

  return {
    chainIdNotSupported,
    transaction,
    transactionRetrieved,
    errorMessage,
    error: !!errorMessage,
    received: transaction.to === address,
  }
}
