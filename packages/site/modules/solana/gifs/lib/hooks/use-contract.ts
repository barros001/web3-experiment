import { useEffect, useState } from 'react';
import { Gif } from '@modules/solana/gifs/lib/types';
import { getContract } from '@modules/solana/gifs/lib/contract';

const useContract = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isWorking, setIsWorking] = useState<boolean>(false);
  const [account, setAccount] = useState<any>(null);

  const addGif = async (url: string): Promise<void> => {
    setIsWorking(true);
    try {
      setAccount(await getContract().addGif(url));
    } catch (e) {
      setIsWorking(false);
      throw e;
    }
    setIsWorking(false);
  };

  const initializeAccount = async () => {
    setIsWorking(true);
    try {
      setAccount(await getContract().initializeAccount());
    } catch (e) {
      setIsWorking(false);
      throw e;
    }
    setIsWorking(false);
  };

  const refreshAccount = async () => {
    try {
      setAccount(await getContract().getAccount());
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    const initialize = async () => {
      await refreshAccount();

      setIsLoading(false);
    };

    initialize();
  }, []);

  const gifs: Array<Gif> = account?.gifList || [];

  return {
    isLoading,
    isWorking,
    account,
    initializeAccount,
    gifs,
    addGif,
  };
};

export default useContract;
