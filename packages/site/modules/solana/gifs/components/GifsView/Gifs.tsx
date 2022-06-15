import { FC, useState } from 'react';
import ConnectedWallet from '@common/components/ConnectedWallet';
import Form from '@modules/solana/gifs/components/GifsView/Form';
import useContract from '@modules/solana/gifs/lib/hooks/use-contract';
import Loading from '@common/components/Loading';
import InitializeAccount from '@modules/solana/gifs/components/GifsView/InitializeAccount';

type Props = {
  wallet: string;
};

const Gifs: FC<Props> = ({ wallet }) => {
  const { isLoading, isWorking, gifs, addGif, account, initializeAccount } =
    useContract();

  if (isLoading) {
    return <Loading />;
  }

  if (!account) {
    return (
      <InitializeAccount
        isWorking={isWorking}
        initializeAccount={initializeAccount}
      />
    );
  }

  return (
    <>
      <div className="mb-4">
        <Form isWorking={isWorking} addGif={addGif} />
      </div>

      <ConnectedWallet wallet={wallet} />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mb-4">
        {gifs.map((gif, key) => {
          return (
            <span key={key}>
              <img src={gif.gifLink} alt={gif.gifLink} className="w-full" />
              <p className="text-xs text-center mt-1">
                <a
                  href={`https://explorer.solana.com/address/${gif.userAddress.toString()}?cluster=devnet`}
                  target="_blank"
                  rel="noreferrer"
                  className="text-blue-600 break-all"
                >
                  {gif.userAddress.toString()}
                </a>
              </p>
            </span>
          );
        })}
      </div>
    </>
  );
};

export default Gifs;
