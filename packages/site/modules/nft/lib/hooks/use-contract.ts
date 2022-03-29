import { useEffect, useState } from 'react';
import { Transaction } from '@common/lib/types';
import { getContract } from '@modules/nft/lib/contract';
import { BigNumber, BigNumberish } from 'ethers';
import { Nft } from '@modules/nft/lib/types';
import formatEther from '@common/lib/helpers/format-ether';

const useContract = (
  wallet: string,
  onTransaction: (transaction: Transaction) => void
) => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isWorking, setIsWorking] = useState<boolean>(false);
  const [totalSupply, setTotalSupply] = useState<number>(0);
  const [maxTokens, setMaxTokens] = useState<number>(0);
  const [balance, setBalance] = useState<number>(0);
  const [nfts, setNfts] = useState<Nft[]>([]);

  const getBalanceOf = async (wallet: string): Promise<BigNumber> => {
    return await getContract().balanceOf(wallet);
  };

  const getTotalSupply = async (): Promise<BigNumber> => {
    return await getContract().totalSupply();
  };

  const getMaxTokens = async (): Promise<BigNumber> => {
    return await getContract().MAX_TOKENS();
  };

  const refreshNumbers = async (): Promise<void> => {
    const [totalSupply, maxTokens, balanceOf] = await Promise.all([
      getTotalSupply(),
      getMaxTokens(),
      getBalanceOf(wallet),
    ]);

    setTotalSupply(totalSupply.toNumber());
    setMaxTokens(maxTokens.toNumber());
    setBalance(balanceOf.toNumber());
  };

  const mint = async () => {
    try {
      setIsWorking(true);

      const txn = await getContract().makeAnEpicNFT({ gasLimit: 1000000 });

      onTransaction({
        hash: txn.hash,
        status: 'pending',
      });

      txn
        .wait()
        .then(async () => {
          onTransaction({
            hash: txn.hash,
            status: 'mined',
          });
          setIsWorking(false);
        })
        .catch(async () => {
          onTransaction({
            hash: txn.hash,
            status: 'failed',
          });
          setIsWorking(false);
        });
    } catch (e) {
      setIsWorking(false);
      throw e;
    }
  };

  useEffect(() => {
    const initialize = async () => {
      const nftMintedListener = async (
        owner: string,
        id: BigNumber,
        name: string,
        timestamp: number
      ) => {
        console.log('Event received!', owner, wallet);
        if (owner.toUpperCase() === wallet.toUpperCase()) {
          setNfts((nfts) => [
            {
              owner: owner,
              id: id.toNumber(),
              name: name,
              timestamp: new Date(timestamp * 1000),
            },
            ...nfts,
          ]);
        }
        await refreshNumbers();
      };

      await refreshNumbers();
      getContract().on('NewEpicNFTMinted', nftMintedListener);
      setIsLoading(false);

      return () => {
        getContract().off('NewEpicNFTMinted', nftMintedListener);
      };
    };

    initialize();
  }, []);

  return {
    isLoading,
    isWorking,
    totalSupply,
    maxTokens,
    balance,
    mint,
    nfts,
  };
};
export default useContract;
