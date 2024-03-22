export const MAINNET_URL = 'https://api.etherscan.io'
export const TESTNET_GOERLI_URL = 'https://api-goerli.etherscan.io'
export const TESTNET_SEPOLIA_URL = 'https://api-sepolia.etherscan.io'

const { VITE_ETHERSCAN_API_KEY } = import.meta.env
if (!VITE_ETHERSCAN_API_KEY) {
  throw new Error('VITE_ETHERSCAN_API_KEY must be defined')
}

export const API_KEY = VITE_ETHERSCAN_API_KEY
