import React, { FC, useContext, useEffect, useState } from 'react';
import { Wallet, WalletProvider } from './types';

export type WalletContext = {
  isLoading: boolean;
  isInstalled: boolean;
  wallet?: Wallet;
  connect: () => Promise<void>;
};

const buildWalletContext = (walletProvider: WalletProvider) => {
  const Context = React.createContext<WalletContext>({
    isLoading: true,
    isInstalled: false,
    connect: async () => {},
  });

  const WalletContextProvider: FC = ({ children }) => {
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [wallet, setWallet] = useState<Wallet | undefined>();

    const connect = async () => {
      setWallet(await walletProvider.connect());
    };

    const isWalletInstalled = walletProvider.isInstalled();

    useEffect(() => {
      const initialize = async () => {
        try {
          setIsLoading(true);

          if (walletProvider.isInstalled()) {
            setWallet(await walletProvider.getConnectedWallet());
            walletProvider.onWalletChanged(setWallet);
          }

          setIsLoading(false);
        } catch (e) {
          console.log(e);
        }
      };

      window.addEventListener('load', initialize);

      return () => {
        walletProvider.cleanup();
        window.removeEventListener('load', initialize);
      };
    }, [isWalletInstalled]);

    return (
      <Context.Provider
        value={{
          isLoading,
          isInstalled: walletProvider.isInstalled(),
          wallet,
          connect,
        }}
      >
        {children}
      </Context.Provider>
    );
  };

  return {
    Context,
    WalletContextProvider,
  };
};

const useWallet = (walletProvider: WalletProvider) => {
  return useContext(walletProvider.getContext());
};

export { buildWalletContext, useWallet };
