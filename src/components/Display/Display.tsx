import { TransactionData } from '../TransactionData/TransactionData'
import { CoinGeckoContextProvider } from '~/hooks/useCoinGecko'
import { useMetaMask } from '~/hooks/useMetaMask'
import { formatChainAsNum } from '~/utils'
import styles from './Display.module.css'

export const Display = () => {
  const { wallet, isConnected } = useMetaMask()

  return (
    <div className={styles.display}>
      {isConnected && (
        <>
          <div>Addr: {wallet.accounts[0]}</div>
          <div>Balance: {wallet.balance}</div>
          <div>Hex ChainId: {wallet.chainId}</div>
          <div>Numeric ChainId: {formatChainAsNum(wallet.chainId)}</div>
          <CoinGeckoContextProvider>
            <TransactionData
              address={wallet.accounts[0]}
              chainId={wallet.chainId}
            />
          </CoinGeckoContextProvider>
        </>
      )}
    </div>
  )
}
