import { useMetaMask } from '~/hooks/useMetaMask'
import { useBlockChainData } from '~/hooks/useBlockChainData'
import { formatChainAsNum } from '~/utils'
import styles from './Display.module.css'

export const Display = () => {

  const { wallet, isConnected } = useMetaMask()
  const address = isConnected ? wallet.accounts[0] : ''
  // const address = '0x78095ebf565beb53ac31f0594287c032539e4cd5'
  const { transactionDate, transactionDateExists, loading, error } = useBlockChainData(address)

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
          {error &&
            <div>Error loading transaction data. Please refresh the page.</div>
          }
        </>
      }
    </div>
  )

}