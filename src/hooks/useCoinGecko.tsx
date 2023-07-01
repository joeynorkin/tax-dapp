import {
  createContext,
  PropsWithChildren,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react'

type CoinsListItem = {
  id: string
  symbol: string
  name: string
}

interface CoinGeckoContextData {
  initializing: boolean
  fetchCurrentPrice: (tokenId: string, currency: string) => void
  currentPrice: string
}

const CoinGeckoContext = createContext<CoinGeckoContextData | undefined>(
  undefined
)

export const CoinGeckoContextProvider = ({ children }: PropsWithChildren) => {
  const [supportedTokenIds, setSupportedTokenIds] = useState<string[]>([])
  const [supportedCurrencies, setSupportedCurrencies] = useState<string[]>([])
  const [currentPrice, setCurrentPrice] = useState('')

  const apiUrl = 'https://api.coingecko.com/api/v3'

  // combine both fetch callbacks into one?
  const fetchSupportedTokenIds = useCallback(async () => {
    const res = await fetch(`${apiUrl}/coins/list`)
    const coinsList: CoinsListItem[] = await res.json()
    const tokenIds: string[] = coinsList.map(item => item.id)
    setSupportedTokenIds(tokenIds)
  }, [])

  const fetchSupportedCurrencies = useCallback(async () => {
    const res = await fetch(`${apiUrl}/simple/supported_vs_currencies`)
    const currencies: string[] = await res.json()
    setSupportedCurrencies(currencies)
  }, [])

  useEffect(() => {
    fetchSupportedTokenIds()
    fetchSupportedCurrencies()
  }, [])

  const isTokenIdSupported = (tokenId: string) =>
    supportedTokenIds.includes(tokenId)
  const isCurrencySupported = (currency: string) =>
    supportedCurrencies.includes(currency)

  const fetchCurrentPrice = async (
    tokenId: string,
    currency: string = 'usd'
  ) => {
    if (isInitializing()) {
      return
    }

    if (!isTokenIdSupported(tokenId)) {
      throw new Error(`Getting price of ${tokenId} is not supported.`)
    }

    if (!isCurrencySupported(currency)) {
      throw new Error(`Currency: ${currency} is not supported.`)
    }

    const res = await fetch(
      `${apiUrl}/simple/price?ids=${tokenId}&vs_currencies=${currency}`
    )
    const json = await res.json()
    setCurrentPrice(json[tokenId][currency])
  }

  const isInitializing = useCallback(
    () => supportedTokenIds.length === 0 || supportedCurrencies.length === 0,
    [supportedTokenIds, supportedCurrencies]
  )

  useEffect(() => {
    console.log('supportedTokenIds')
    console.log(supportedTokenIds)
  }, [supportedTokenIds])

  useEffect(() => {
    console.log('supportedCurrencies')
    console.log(supportedCurrencies)
  }, [supportedCurrencies])

  return (
    <CoinGeckoContext.Provider
      value={{
        fetchCurrentPrice,
        currentPrice,
        initializing: isInitializing(),
      }}
    >
      {children}
    </CoinGeckoContext.Provider>
  )
}

export const useCoinGecko = () => {
  const context = useContext(CoinGeckoContext)
  if (context === undefined) {
    throw new Error(
      'useCoinGecko must be used within a CoinGeckoContextProvider'
    )
  }
  return context
}
