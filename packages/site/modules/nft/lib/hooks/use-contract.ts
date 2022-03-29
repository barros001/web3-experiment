import { useState } from 'react';
import { Transaction } from '@common/lib/types';
import { getContract } from '@modules/nft/lib/contract';

const useContract = (
  wallet: string,
  onTransaction: (transaction: Transaction) => void
) => {
  const [isWorking, setIsWorking] = useState<boolean>(false);

  const mint = async () => {
    try {
      setIsWorking(true);

      const txn = await getContract().makeAnEpicNFT({ gasLimit: 1000000 });

      onTransaction({
        hash: txn.hash,
        status: 'pending',
      });
      setIsWorking(false);

      txn
        .wait()
        .then(async () => {
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
        });
    } catch (e) {
      setIsWorking(false);
      throw e;
    }
  };

  return {
    isWorking,
    mint,
  };
};
export default useContract;
