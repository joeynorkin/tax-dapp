import { useMetaMask } from '~/hooks/useMetaMask'
import { formatAddress } from '~/utils'
import styles from './Navigation.module.css'

export const Navigation = () => {
  const { wallet, hasProvider, isConnecting, connectMetaMask, isConnected } =
    useMetaMask()

  return (
    <div className={styles.navigation}>
      <div className={styles.flexContainer}>
        <div className={styles.leftNav}>Alan's Tax Dapp</div>
        <div className={styles.rightNav}>
          {!hasProvider && (
            <a href='https://metamask.io' target='_blank'>
              Install MetaMask
            </a>
          )}

          {window.ethereum?.isMetaMask && !isConnected && (
            <button disabled={isConnecting} onClick={connectMetaMask}>
              Connect MetaMask
            </button>
          )}

          {hasProvider && isConnected && (
            <a
              className='text_link tooltip-bottom'
              href={`https://etherscan.io/address/${wallet.accounts[0]}`}
              target='_blank'
              data-tooltip='Open in Block Explorer'
            >
              {formatAddress(wallet.accounts[0])}
            </a>
          )}
        </div>
      </div>
    </div>
  )
}
