import { FC } from 'react';

type Props = {
  wallet: string;
  balance: number;
};

const Balance: FC<Props> = ({ wallet, balance }) => {
  if (balance === 0) {
    return (
      <p className="text-center">
        You do not own any NFT from this collection. What are you waiting for?
      </p>
    );
  }

  return (
    <>
      <p className="text-center">
        You own <span className="font-bold">{balance}</span> NFT
        {balance > 1 ? 's' : ''} from this collection.
        <br />
        View <span className="font-bold">your</span> collection on:{' '}
        <a
          href={`https://testnets.opensea.io/${wallet}`}
          target="_blank"
          rel="noreferrer"
          className="text-blue-600"
        >
          OpenSea
        </a>{' '}
        |{' '}
        <a
          href={`https://rinkeby.rarible.com/user/${wallet}/owned`}
          target="_blank"
          rel="noreferrer"
          className="text-blue-600"
        >
          Rarible
        </a>
      </p>
    </>
  );
};

export default Balance;
