import { useMetaMask } from '~/hooks/useMetaMask'
import { useTransactionData } from '~/hooks/useTransactionData'
import { formatChainAsNum } from '~/utils'
import styles from './Display.module.css'

export const Display = () => {

  const { wallet, isConnected } = useMetaMask()
  const address = isConnected ? wallet.accounts[0] : ''
  const { 
    transactionDate,
    transactionDateExists,
    loading,
    error,
    chainIdNotSupported
  } = useTransactionData(address, wallet.chainId)

  return (
    <div className={styles.display}>
      {isConnected &&
        <>
          <div>Addr: {wallet.accounts[0]}</div>
          <div>Balance: {wallet.balance}</div>
          <div>Hex ChainId: {wallet.chainId}</div>
          <div>Numeric ChainId: {formatChainAsNum(wallet.chainId)}</div>
          {!error && !loading && transactionDateExists &&
            <div>Most Recent transaction happened on {transactionDate}</div>
          }
          {!error && !loading && !transactionDateExists &&
            <div>There are no associated transactions with this address.</div>
          }

          {error && chainIdNotSupported &&
            <div>ChainId not supported for retrieving transaction data.</div>
          }

          {error && !chainIdNotSupported &&
            <div>Error loading transaction data. Please refresh the page.</div>
          }
        </>
      }
    </div>
  )

}