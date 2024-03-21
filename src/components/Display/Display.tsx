import { TransactionData } from '../TransactionData'
import { WalletInfo } from '../WalletInfo'
import { CoinGeckoContextProvider } from '~/hooks/useCoinGecko'
import { useMetaMask } from '~/hooks/useMetaMask'
import styles from './Display.module.css'

export const Display = () => {
  const { wallet, isConnected } = useMetaMask()

  return (
    <div className={styles.display}>
      {isConnected && (
        <>
          <WalletInfo
            address={wallet.accounts[0]}
            chainId={wallet.chainId}
            balance={wallet.balance}
          />
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
