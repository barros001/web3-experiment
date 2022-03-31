import { MetaMaskInpageProvider } from '@metamask/providers';
import { Wallet, WalletProvider } from '@common/lib/wallet/types';
import { buildWalletContext } from '@common/lib/wallet/context';

declare global {
  interface Window {
    ethereum: MetaMaskInpageProvider;
  }
}

const isInstalled = (): boolean => {
  if (typeof window === 'undefined') {
    return false;
  }

  return !!window.ethereum;
};

const getProvider = (): MetaMaskInpageProvider => {
  assertIsInstalled();

  return window.ethereum;
};

const assertIsInstalled = (): void => {
  if (!isInstalled()) {
    throw Error('MetaMask is not installed');
  }
};

const getConnectedChainId = async (): Promise<string | undefined> => {
  assertIsInstalled();

  const chainId = await window.ethereum.request<string>({
    method: 'eth_chainId',
  });

  return chainId ?? undefined;
};

const buildWallet = async (publicKey: string): Promise<Wallet> => {
  return {
    publicKey: publicKey,
    chainId: await getConnectedChainId(),
  };
};

const getConnectedWallet = async (): Promise<Wallet | undefined> => {
  assertIsInstalled();

  const accounts = await window.ethereum.request<Array<string>>({
    method: 'eth_accounts',
  });

  if (!accounts || accounts.length === 0 || accounts[0] === undefined) {
    return undefined;
  }

  return buildWallet(accounts[0]);
};

const connect = async (): Promise<Wallet> => {
  assertIsInstalled();

  const accounts = await window.ethereum.request<Array<string>>({
    method: 'eth_requestAccounts',
  });

  if (!accounts || accounts.length === 0 || accounts[0] === undefined) {
    throw Error('No wallets have been connected');
  }

  return buildWallet(accounts[0]);
};

const onWalletChanged = (
  listener: (wallet: Wallet | undefined) => void
): void => {
  assertIsInstalled();

  window.ethereum.on('accountsChanged', async () => {
    listener(await getConnectedWallet());
  });

  window.ethereum.on('chainChanged', async () => {
    listener(await getConnectedWallet());
  });
};

const cleanup = () => {
  assertIsInstalled();
  getProvider().removeAllListeners();
};

const getContext = () => {
  return Context;
};

const MetaMask: WalletProvider = {
  isInstalled,
  getProvider,
  getConnectedWallet,
  connect,
  onWalletChanged,
  cleanup,
  getContext,
};

const { Context, WalletContextProvider } = buildWalletContext(MetaMask);

export default MetaMask;
export { WalletContextProvider };
