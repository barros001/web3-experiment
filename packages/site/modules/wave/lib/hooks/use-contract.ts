import { getContract } from '@modules/wave/lib/contract';
import { useEffect, useState } from 'react';
import { Prize, Wave } from '@modules/wave/lib/types';
import { Transaction } from '@common/lib/types';
import { formatEther } from '@modules/wave/lib/contract/contract';
import { BigNumberish } from 'ethers';

const useContract = (
  wallet: string,
  onTransaction: (transaction: Transaction) => void,
  onPrizeAwarded: (prize: Prize) => void
) => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isWorking, setIsWorking] = useState<boolean>(false);
  const [waves, setWaves] = useState<Array<Wave>>([]);

  const refreshWaves = async () => {
    try {
      const waves = await getContract().getAllWaves();
      let cleanWaves: Wave[] = [];

      waves?.forEach((wave: any) => {
        cleanWaves.push({
          waver: wave.waver,
          message: wave.message,
          timestamp: new Date(wave.timestamp * 1000),
          status: 'mined',
        });
      });

      setWaves(cleanWaves.reverse());
    } catch (e) {
      console.error(e);
    }
  };

  const wave = async (message: string): Promise<boolean> => {
    try {
      setIsWorking(true);

      const txn = await getContract().wave(message, { gasLimit: 300000 });

      onTransaction({
        hash: txn.hash,
        status: 'pending',
      });
      setIsWorking(false);
      setWaves((waves) => [
        {
          waver: wallet,
          message: message,
          timestamp: new Date(),
          status: 'pending',
        },
        ...waves,
      ]);

      txn
        .wait()
        .then(async () => {
          await refreshWaves();

          onTransaction({
            hash: txn.hash,
            status: 'mined',
          });
        })
        .catch(async () => {
          onTransaction({
            hash: txn.hash,
            status: 'failed',
          });

          await refreshWaves();
        });

      return true;
    } catch (e) {
      setIsWorking(false);
      throw e;
    }

    return false;
  };

  useEffect(() => {
    const initialize = async () => {
      const newWaveListener = async () => {
        await refreshWaves();
      };

      const prizeAwardedListener = async (
        receiver: string,
        timestamp: number,
        amount: BigNumberish
      ) => {
        onPrizeAwarded({
          receiver: receiver,
          timestamp: new Date(timestamp * 1000),
          amount: formatEther(amount),
        });
      };

      getContract().on('NewWave', newWaveListener);
      getContract().on('PrizeAwarded', prizeAwardedListener);

      await newWaveListener();
      setIsLoading(false);

      return () => {
        getContract().off('NewWave', newWaveListener);
        getContract().off('PrizeAwarded', prizeAwardedListener);
      };
    };

    initialize();
  }, []);

  return {
    isLoading,
    isWorking,
    wave,
    waves,
  };
};
export default useContract;
