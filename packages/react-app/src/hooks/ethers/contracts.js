import { Contract } from '@ethersproject/contracts'
import { useMemo } from 'react'
import { useChainId } from './provider'

export function _useContract(
  provider,
  abi,
  contractAddress,
  signerAddressOrIndex
) {
  const chainId = useChainId(provider)

  return useMemo(() => {
    const signer =
      signerAddressOrIndex !== undefined && provider?.getSigner
        ? provider.getSigner(signerAddressOrIndex)
        : undefined

    return chainId === undefined
      ? undefined
      : new Contract(contractAddress, abi, signer || provider)
  }, [abi, chainId, contractAddress, provider, signerAddressOrIndex])
}

export function useContract(
  abi,
  provider,
  contractAddress,
  signerAddressOrIndex
) {
  return _useContract(provider, abi, contractAddress, signerAddressOrIndex)
}
