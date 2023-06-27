import { Display } from './components/Display'
import { Navigation } from './components/Navigation'
import { MetaMaskContextProvider } from './hooks/useMetaMask'
import styles from './App.module.css'
import './App.global.css'

export const App = () => {
  return (
    <MetaMaskContextProvider>
      <div className={styles.appContainer}>
        <Navigation />
        <Display />
      </div>
    </MetaMaskContextProvider>
  )
}