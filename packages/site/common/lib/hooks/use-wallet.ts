import { useContext, useEffect, useState } from 'react';
import { connectWallet, isMetaMaskInstalled } from '@common/lib/meta-mask';
import Context from '@common/lib/context';

const useWallet = () => {
  const { wallet, setWallet, isWalletLoading: isLoading } = useContext(Context);

  const connect = async () => {
    setWallet(await connectWallet());
  };

  return {
    isLoading,
    isWalletInstalled: isMetaMaskInstalled(),
    wallet,
    connect,
  };
};

export default useWallet;
