import React, {
  Dispatch,
  FC,
  ReactElement,
  SetStateAction,
  useEffect,
  useState,
} from 'react';
import {
  clearEventListeners,
  getConnectedWallet,
  onAccountsChanged,
  getConnectedChainId,
  onChainChanged,
} from '@common/lib/meta-mask';

type Context = {
  snackbarItems: ReactElement[];
  setSnackbarItems: Dispatch<SetStateAction<ReactElement[]>>;
  isWalletLoading: boolean;
  setIsWalletLoading: Dispatch<SetStateAction<boolean>>;
  wallet?: string;
  setWallet: Dispatch<SetStateAction<string | undefined>>;
  chainId?: string;
};

const Context = React.createContext<Context>({
  snackbarItems: [],
  setSnackbarItems: () => {},
  isWalletLoading: true,
  setIsWalletLoading: () => {},
  setWallet: () => {},
});

const ContextProvider: FC = ({ children }) => {
  const [snackbarItems, setSnackbarItems] = useState<ReactElement[]>([]);
  const [isWalletLoading, setIsWalletLoading] = useState<boolean>(true);
  const [wallet, setWallet] = useState<string | undefined>();
  const [chainId, setChainId] = useState<string | undefined>();

  useEffect(() => {
    const initialize = async () => {
      try {
        setWallet(await getConnectedWallet());
        setChainId(await getConnectedChainId());
        onAccountsChanged(setWallet);
        onChainChanged(setChainId);
        setIsWalletLoading(false);
      } catch (e) {
        console.log(e);
      }
    };

    initialize();

    return () => {
      clearEventListeners();
    };
  }, []);

  return (
    <Context.Provider
      value={{
        snackbarItems,
        setSnackbarItems,
        isWalletLoading,
        setIsWalletLoading,
        wallet,
        setWallet,
        chainId,
      }}
    >
      {children}
    </Context.Provider>
  );
};

export default Context;
export { ContextProvider };
