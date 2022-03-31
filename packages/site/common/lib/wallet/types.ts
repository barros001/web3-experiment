import { Context } from 'react';
import { WalletContext } from '@common/lib/wallet/context';

export type Wallet = {
  publicKey: string;
  chainId?: string;
};

export interface WalletProvider {
  isInstalled: () => boolean;
  getProvider: () => any;
  getContext: () => Context<WalletContext>;
  getConnectedWallet: () => Promise<Wallet | undefined>;
  connect: () => Promise<Wallet>;
  onWalletChanged: (listener: (wallet: Wallet | undefined) => void) => void;
  cleanup: () => void;
}
