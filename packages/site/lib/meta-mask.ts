import { MetaMaskInpageProvider } from '@metamask/providers';

declare global {
  interface Window {
    ethereum: MetaMaskInpageProvider;
  }
}

const isMetaMaskInstalled = (): boolean => {
  if (typeof window === 'undefined') {
    return false;
  }

  return !!window.ethereum;
};

const getProvider = (): MetaMaskInpageProvider | undefined => {
  return isMetaMaskInstalled() ? window.ethereum : undefined;
};

const getConnectedWallet = async (): Promise<string | undefined> => {
  if (!isMetaMaskInstalled()) {
    return undefined;
  }

  const accounts = await window.ethereum.request<Array<string>>({
    method: 'eth_accounts',
  });

  if (!accounts || accounts.length === 0) {
    return undefined;
  }

  return accounts[0];
};

const connectWallet = async (): Promise<string | undefined> => {
  if (!isMetaMaskInstalled()) {
    return undefined;
  }

  const accounts = await window.ethereum.request<Array<string>>({
    method: 'eth_requestAccounts',
  });

  if (!accounts || accounts.length === 0) {
    return undefined;
  }

  return accounts[0];
};

const onAccountsChanged = (
  callback: (wallet: string | undefined) => void
): void => {
  if (!isMetaMaskInstalled()) {
    return;
  }

  window.ethereum.on('accountsChanged', (args) => {
    const accounts = args as Array<string>;

    callback(accounts && accounts.length > 0 ? accounts[0] : undefined);
  });
};

const clearEventListeners = () => {
  window.ethereum.removeAllListeners();
};

export {
  isMetaMaskInstalled,
  getConnectedWallet,
  connectWallet,
  onAccountsChanged,
  getProvider,
  clearEventListeners,
};
