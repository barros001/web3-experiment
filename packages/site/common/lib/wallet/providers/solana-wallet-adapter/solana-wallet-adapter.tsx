import {
  Wallet,
  WalletProvider as WalletProviderType,
} from '@common/lib/wallet/types';
import { buildWalletContext } from '@common/lib/wallet/providers/solana-wallet-adapter/context';
import ConnectWalletButton from '@common/lib/wallet/providers/solana-wallet-adapter/ConnectWalletButton';

const isInstalled = (): boolean => {
  return true;
};

const getProvider = (): any => {
  return undefined;
};

const getConnectedWallet = async (): Promise<Wallet | undefined> => {
  return undefined;
};

const connect = async (): Promise<Wallet> => {
  throw 'Not Implemented';
};

const onWalletChanged = (
  listener: (wallet: Wallet | undefined) => void
): void => {};

const cleanup = () => {};

const getContext = () => {
  return Context;
};

const getVendorDetails = () => {
  return {
    name: 'Solana Wallet Adapter',
    url: 'https://github.com/solana-labs/wallet-adapter',
    color: '#47389C',
  };
};

const getChainName = () => {
  return 'Unknown Network';
};

const SolanaWalletAdapter: WalletProviderType = {
  isInstalled,
  getProvider,
  getConnectedWallet,
  connect,
  onWalletChanged,
  cleanup,
  getContext,
  getVendorDetails,
  getChainName,
  getConnectWalletComponent: ConnectWalletButton,
};

const { Context, WalletContextProvider } =
  buildWalletContext(SolanaWalletAdapter);

export default SolanaWalletAdapter;
export { WalletContextProvider };
