import React from 'react'
import { useTransactionData } from '~/hooks/useTransactionData'

interface TransactionDataProps {
  address: string
  chainId: string
}

export const TransactionData: React.FC<TransactionDataProps> = ({
  address,
  chainId,
}) => {
  const { transactionDate } = useTransactionData(address, chainId)

  return (
    <>
      {transactionDate && (
        <div>Most Recent transaction happened on {transactionDate}</div>
      )}
    </>
  )
}
