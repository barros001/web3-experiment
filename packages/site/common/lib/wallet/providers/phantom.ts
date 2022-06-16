import { Wallet, WalletProvider } from '@common/lib/wallet/types';
import { buildWalletContext } from '@common/lib/wallet/context';

const listeners: ((wallet: Wallet | undefined) => void)[] = [];
let interval: number | undefined = undefined;

declare global {
  interface Window {
    solana: any;
  }
}

const isInstalled = (): boolean => {
  if (typeof window === 'undefined') {
    return false;
  }

  return !!window.solana;
};

const getProvider = (): any => {
  assertIsInstalled();

  return window.solana;
};

const assertIsInstalled = (): void => {
  if (!isInstalled()) {
    throw Error('Phantom Wallet is not installed');
  }
};

const buildWallet = (publicKey: string): Wallet => {
  return {
    publicKey: publicKey,
  };
};

const getConnectedWallet = async (): Promise<Wallet | undefined> => {
  assertIsInstalled();

  try {
    const res = await getProvider().connect({ onlyIfTrusted: true });
    return buildWallet(res.publicKey.toString());
  } catch (e) {
    return undefined;
  }
};

const connect = async (): Promise<Wallet> => {
  assertIsInstalled();

  const res = await getProvider().connect();

  return buildWallet(res.publicKey.toString());
};

const onWalletChanged = (
  listener: (wallet: Wallet | undefined) => void
): void => {
  assertIsInstalled();

  listeners.push(listener);

  if (listeners.length === 1) {
    getProvider().on('connect', async (publicKey: any) => {
      const wallet = buildWallet(publicKey.toString());

      listeners.forEach((listener) => listener(wallet));
    });

    getProvider().on('disconnect', async () => {
      listeners.forEach((listener) => listener(undefined));
    });

    interval = (() => {
      let previousPublicKey = getProvider().publicKey;

      return window.setInterval(async () => {
        const publicKey = getProvider().publicKey;

        if (previousPublicKey != publicKey) {
          const wallet = publicKey
            ? buildWallet(publicKey.toString())
            : undefined;
          previousPublicKey = publicKey;

          listeners.forEach((listener) => listener(wallet));
        }
      }, 500);
    })();
  }
};

const cleanup = () => {
  if (!isInstalled()) {
    return;
  }

  getProvider().removeAllListeners();
  listeners.length = 0;

  window.clearInterval(interval);
  interval = undefined;
};

const getContext = () => {
  return Context;
};

const getVendorDetails = () => {
  return {
    name: 'Phantom Wallet',
    url: 'https://phantom.app/',
    color: '#4B48C6',
  };
};

const getChainName = () => {
  return 'Unknown Network';
};

const Phantom: WalletProvider = {
  isInstalled,
  getProvider,
  getConnectedWallet,
  connect,
  onWalletChanged,
  cleanup,
  getContext,
  getVendorDetails,
  getChainName,
};

const { Context, WalletContextProvider } = buildWalletContext(Phantom);

export default Phantom;
export { WalletContextProvider };
