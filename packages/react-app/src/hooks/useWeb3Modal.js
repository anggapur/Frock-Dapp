import { useCallback, useEffect, useMemo, useState } from 'react';

import { Web3Provider } from '@ethersproject/providers';
import Web3Modal from 'web3modal';

export function useWeb3Modal(config) {
  const [provider, setProvider] = useState();
  const [autoLoaded, setAutoLoaded] = useState(false);
  const [walletExist, setWalletExist] = useState(false);

  const { autoLoad = true, network = '' } = config;

  const web3Modal = useMemo(
    () =>
      new Web3Modal({
        network,
        cacheProvider: true,
        providerOptions: {},
      }),
    [network],
  );

  const loadWeb3Modal = useCallback(async () => {
    if (
      typeof window.ethereum !== 'undefined' ||
      typeof window.web3 !== 'undefined'
    ) {
      const web3Provider = await web3Modal.connect();
      return setProvider(new Web3Provider(web3Provider, 'any'));
    }
    return setWalletExist(true);
  }, [web3Modal]);

  const logoutWeb3Modal = useCallback(async () => {
    await web3Modal.clearCachedProvider();
    window.location.reload();
  }, [web3Modal]);

  useEffect(() => {
    if (
      autoLoad &&
      !autoLoaded &&
      localStorage.getItem('WEB3_CONNECT_CACHED_PROVIDER') &&
      web3Modal.cachedProvider
    ) {
      loadWeb3Modal();
      setAutoLoaded(true);
    }
  }, [autoLoad, autoLoaded, loadWeb3Modal, web3Modal.cachedProvider]);

  return {
    walletExist,
    provider,
    loadWeb3Modal,
    logoutWeb3Modal,
  };
}
