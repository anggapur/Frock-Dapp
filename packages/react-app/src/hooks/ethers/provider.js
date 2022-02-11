import { useEffect, useState } from 'react';

import { useStore } from '../useStore';

export function useChainId(provider) {
  const [chainId, setChainId] = useState();

  useEffect(() => {
    if (!provider) return;

    if (chainId === undefined) {
      provider.getNetwork().then(network => setChainId(network.chainId));
    }
  }, [chainId, provider]);

  useEffect(() => {
    if (!provider) return undefined;

    const handleNetworkChange = newNetwork => {
      setChainId(newNetwork.chainId);
    };

    provider.on('network', handleNetworkChange);
    return () => {
      provider.off('network', handleNetworkChange);
    };
  }, [provider]);

  return chainId;
}

export function useProvider() {
  const provider = useStore(state => state.provider);
  return provider;
}
