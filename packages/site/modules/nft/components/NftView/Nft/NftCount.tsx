import { FC } from 'react';

type Props = {
  count: number;
  maxSupply: number;
};

const NftCount: FC<Props> = ({ count, maxSupply }) => {
  if (count < maxSupply) {
    return (
      <p className="mb-4">
        <span className="font-bold">{count}</span> out of{' '}
        <span className="font-bold">{maxSupply}</span> NFTs minted so far!
      </p>
    );
  }

  return <p className="mb-4">All {maxSupply} NFTs have been minted already!</p>;
};

export default NftCount;
