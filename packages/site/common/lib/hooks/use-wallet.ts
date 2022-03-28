import { useEffect, useState } from 'react';
import {
  clearEventListeners,
  connectWallet,
  getConnectedWallet,
  isMetaMaskInstalled,
  onAccountsChanged,
} from '@common/lib/meta-mask';

const useWallet = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [wallet, setWallet] = useState<string | undefined>();

  const connect = async () => {
    setWallet(await connectWallet());
  };

  useEffect(() => {
    const initialize = async () => {
      try {
        setWallet(await getConnectedWallet());
        onAccountsChanged(setWallet);
        setIsLoading(false);
      } catch (e) {
        console.log(e);
      }
    };

    initialize();

    return () => {
      clearEventListeners();
    };
  }, []);

  return {
    isLoading,
    isWalletInstalled: isMetaMaskInstalled(),
    wallet,
    connect,
  };
};

export default useWallet;
