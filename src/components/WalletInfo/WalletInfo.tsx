import { formatChainAsNum } from '~/utils'

interface WalletInfoProps {
  address: string
  chainId: string
  balance: string
}

export const WalletInfo: React.FC<WalletInfoProps> = ({
  address,
  chainId,
  balance,
}) => (
  <>
    <div>Address: {address}</div>
    <div>ChainId: {formatChainAsNum(chainId)}</div>
    <div>Balance: {balance} ETH</div>
  </>
)
