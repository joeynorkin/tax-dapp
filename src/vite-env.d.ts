/// <reference types="vite/client" />

interface Window {
  ethereum: any
}

interface ImportMetaEnv {
  readonly VITE_ETHERSCAN_API_KEY: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
