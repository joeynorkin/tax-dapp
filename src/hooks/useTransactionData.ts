import {
  useCallback,
  useEffect,
  useState
} from 'react'

import { formatTimeStamp } from '~/utils'
import { useEtherscan } from './useEtherscan'

export const useTransactionData = (address: string, chainId: string) => {
  const [ transactionDate, setTransactionDate ] = useState('')
  const [ transactionDateExists, setTransactionDateExists ] = useState(false)
  const [ loading, setLoading ] = useState(false)
  const [ error, setError ] = useState(false)
  const { fetchData, chainIdNotSupported } = useEtherscan(chainId)

  const params = [
    [ 'module', 'account' ],
    [ 'action', 'txlist' ],
    [ 'address', address ],
    [ 'startblock', '0' ],
    [ 'endblock', '99999999' ],
    [ 'page', '1' ],
    [ 'offset', '10' ],
    [ 'sort', 'asc' ],
  ]

  const fetchLatestTransactionDate = useCallback(async () => {

    if (address === '' || chainIdNotSupported) {
      setError(true)
      return
    }

    const jsonResponse = await fetchData(params);

    if (jsonResponse.message === 'NOTOK') {
      setError(true)
      return
    }

    if (jsonResponse.message !== 'OK') {
      return
    }

    setTransactionDateExists(true)
    setTransactionDate(formatTimeStamp(jsonResponse.result[0].timeStamp))
  }, [address, chainId])

  useEffect(() => {
    setError(false)
    setLoading(true)
    setTransactionDateExists(false)
    fetchLatestTransactionDate()
    setLoading(false)
  }, [fetchLatestTransactionDate])

  return {
    transactionDate,
    transactionDateExists,
    loading,
    error,
    chainIdNotSupported
  }
}