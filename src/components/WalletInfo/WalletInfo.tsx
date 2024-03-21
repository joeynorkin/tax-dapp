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
}) => {
  return (
    <>
      <div>Address: {address}</div>
      <div>Hex ChainId: {chainId}</div>
      <div>Numeric ChainId: {formatChainAsNum(chainId)}</div>
      <div>Balance: {balance} ETH</div>
    </>
  )
}
