import React, { useEffect } from 'react'
import { useCoinGecko } from '~/hooks/useCoinGecko'
import { useTransactionData } from '~/hooks/useTransactionData'
import { formatTimeStamp, toEth } from '~/utils'

interface TransactionDataProps {
  address: string
  chainId: string
}

export const TransactionData: React.FC<TransactionDataProps> = ({
  address,
  chainId,
}) => {
  const { transaction, transactionRetrieved, error, errorMessage, received } =
    useTransactionData(address, chainId)

  const { fetchCurrentPrice, currentPrice, initialized } = useCoinGecko()

  useEffect(() => {
    fetchCurrentPrice('ethereum', 'usd')
  }, [initialized])

  return (
    <>
      {transactionRetrieved && (
        <>
          <div>
            You {received ? 'received' : 'sent'} a transaction of{' '}
            {toEth(transaction.value)} ETH on{' '}
            {formatTimeStamp(transaction.timeStamp)}, which is the most recent
            transaction.
          </div>
          {/* <div>The price of ETH was {'${PRICE}'}.</div> */}
          {currentPrice && <div>The price of ETH today is {currentPrice}.</div>}
        </>
      )}
      {error && <div>{errorMessage}</div>}
    </>
  )
}
