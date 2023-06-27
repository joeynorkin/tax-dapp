import { useMetaMask } from "~/hooks/useMetaMask"
import { formatChainAsNum } from "~/utils"

export const Display = () => {

  const { wallet } = useMetaMask()

  const styles = { display: '' }

  return (
    <div className={styles.display}>
      {wallet.accounts.length > 0 &&
        <>
          <div>Wallet Account: {wallet.accounts[0]}</div>
          <div>Wallet Balance: {wallet.balance}</div>
          <div>Hex ChainId: {wallet.chainId}</div>
          <div>Numeric ChainId: {formatChainAsNum(wallet.chainId)}</div>
        </>
      }
    </div>
  )

}