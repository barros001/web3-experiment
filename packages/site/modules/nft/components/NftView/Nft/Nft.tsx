import { FC } from 'react';
import useContract from '@modules/nft/lib/hooks/use-contract';
import ConnectedWallet from '@common/components/ConnectedWallet';
import useTransactionListener from '@common/lib/hooks/use-transaction-listener';
import Spinner from '@common/components/Spinner';
import Alert from '@common/components/Alert';
import useSnackbar from '@common/lib/hooks/use-snackbar';
import NftCount from '@modules/nft/components/NftView/Nft/NftCount';
import Loading from '@common/components/Loading';
import Balance from '@modules/nft/components/NftView/Nft/Balance';
import NftList from '@modules/nft/components/NftView/Nft/NftList';

type Props = {
  wallet: string;
};

const Nft: FC<Props> = ({ wallet }) => {
  const { listener: transactionListener } = useTransactionListener();
  const { isWorking, mint, isLoading, totalSupply, maxTokens, balance, nfts } =
    useContract(wallet, transactionListener);
  const { addItem } = useSnackbar();

  const doMint = async () => {
    try {
      await mint();
    } catch (e) {
      addItem(<Alert type="danger">{(e as Error).message}</Alert>);
      console.log(e);
    }
  };

  if (isLoading) {
    return <Loading />;
  }

  return (
    <>
      <div className="text-center mb-4">
        <NftCount count={totalSupply} maxSupply={maxTokens} />
        <div className="sm:max-w-[300px] m-auto">
          <button
            className="border-lime-500 rounded text-white bg-lime-500 p-3 w-full disabled:bg-gray-200 disabled:text-gray-500 disabled:cursor-not-allowed"
            disabled={isWorking || totalSupply >= maxTokens}
            onClick={doMint}
          >
            {isWorking ? (
              <Spinner />
            ) : (
              <span>
                {totalSupply >= maxTokens ? (
                  <span className="italic">SOLD OUT!</span>
                ) : (
                  <span>
                    Mint an <span className="underline italic">awesome</span>{' '}
                    new NFT!
                  </span>
                )}
              </span>
            )}
          </button>
        </div>
      </div>
      <ConnectedWallet wallet={wallet} />
      <Balance wallet={wallet} balance={balance} />
      <NftList nfts={nfts} />
    </>
  );
};

export default Nft;
