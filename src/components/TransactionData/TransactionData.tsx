import React from 'react'
import { useTransactionData } from '~/hooks/useTransactionData'
import { formatTimeStamp } from '~/utils'

interface TransactionDataProps {
  address: string
  chainId: string
}

export const TransactionData: React.FC<TransactionDataProps> = ({
  address,
  chainId,
}) => {
  const { transaction, transactionRetrieved } = useTransactionData(
    address,
    chainId
  )

  return (
    <>
      {transactionRetrieved && (
        <div>
          Most recent transaction happened on{' '}
          {formatTimeStamp(transaction.timeStamp)}
        </div>
      )}
    </>
  )
}
