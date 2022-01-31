import { useEffect, useState } from 'react'
import { useChainId, useProvider } from './provider'

export function _useWeb3Accounts(provider) {
  const chainId = useChainId(provider)

  const [accounts, setAccounts] = useState()

  useEffect(() => {
    if (!provider || chainId === undefined) return

    if (provider.listAccounts) {
      provider.listAccounts().then(setAccounts)
    }
  }, [chainId, provider])

  useEffect(() => {
    if (!provider) return undefined

    const externalProvider = provider.provider

    if (
      externalProvider &&
      typeof externalProvider.on === 'function' &&
      typeof externalProvider.removeListiner === 'function'
    ) {
      externalProvider.on('accountsChanged', setAccounts)
      return () => {
        externalProvider.removeListener('accountsChanged', setAccounts)
      }
    }
  }, [provider])

  return accounts
}

export function useWeb3Accounts() {
  const provider = useProvider()
  return _useWeb3Accounts(provider)
}
