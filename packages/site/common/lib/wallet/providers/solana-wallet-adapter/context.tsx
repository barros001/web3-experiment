import React, { FC, useMemo } from 'react';
import { WalletContext } from '@common/lib/wallet/context';
import { WalletAdapterNetwork } from '@solana/wallet-adapter-base';
import { WalletModalProvider } from '@solana/wallet-adapter-react-ui';
import { WalletProvider as WalletProviderType } from '@common/lib/wallet/types';
import {
  ConnectionProvider,
  useWallet,
  WalletProvider,
} from '@solana/wallet-adapter-react';
import {
  GlowWalletAdapter,
  PhantomWalletAdapter,
  SlopeWalletAdapter,
  SolflareWalletAdapter,
  TorusWalletAdapter,
} from '@solana/wallet-adapter-wallets';
import { clusterApiUrl } from '@solana/web3.js';

const network = WalletAdapterNetwork.Devnet;
const endpoint = clusterApiUrl(network);
const wallets = [
  new PhantomWalletAdapter(),
  new GlowWalletAdapter(),
  new SlopeWalletAdapter(),
  new SolflareWalletAdapter({ network }),
  new TorusWalletAdapter(),
];

const buildWalletContext = (walletProvider: WalletProviderType) => {
  const Context = React.createContext<WalletContext>({
    isLoading: true,
    isInstalled: false,
    connect: async () => {},
  });

  const WalletContextProvider: FC = ({ children }) => {
    const { publicKey } = useWallet();

    const connect = async () => {
      await walletProvider.connect();
    };

    return (
      <Context.Provider
        value={{
          isLoading: false,
          isInstalled: walletProvider.isInstalled(),
          wallet: publicKey
            ? {
                publicKey: publicKey.toString(),
              }
            : undefined,
          connect,
        }}
      >
        {children}
      </Context.Provider>
    );
  };

  const WrappedWalletContextProvider: FC = ({ children }) => {
    return (
      <ConnectionProvider endpoint={endpoint}>
        <WalletProvider wallets={wallets} autoConnect>
          <WalletModalProvider>
            <WalletContextProvider>{children}</WalletContextProvider>
          </WalletModalProvider>
        </WalletProvider>
      </ConnectionProvider>
    );
  };

  return { Context, WalletContextProvider: WrappedWalletContextProvider };
};

export { buildWalletContext };
