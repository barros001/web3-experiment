import { FC } from 'react';
import Alert from '@common/components/Alert';
import { Nft } from '@modules/nft/lib/types';

type Props = {
  nfts: Nft[];
};

const NftList: FC<Props> = ({ nfts }) => {
  if (nfts.length === 0) {
    return null;
  }

  return (
    <>
      <h2 className="mb-4 font-bold text-xl">Your latest minted NFTs:</h2>
      <ul>
        {nfts.map((nft, key) => {
          return (
            <li key={key}>
              <Alert type="info">
                <div className="text-left">
                  <span className="font-bold">Owner:</span>{' '}
                  <a
                    href={`https://rinkeby.etherscan.io/address/${nft.owner}`}
                    target="_blank"
                    rel="noreferrer"
                    className="text-blue-600 break-all"
                  >
                    {nft.owner}
                  </a>
                  <br />
                  <span className="font-bold">ID:</span> {nft.id}
                  <br />
                  <span className="font-bold">Name:</span> {nft.name}
                  <br />
                  <span className="font-bold">When:</span>{' '}
                  {nft.timestamp.toLocaleString()}
                  <br />
                  <br />
                  View on:{' '}
                  <a
                    href={`https://testnets.opensea.io/assets/${process.env.NEXT_PUBLIC_NFT_CONTRACT_ADDRESS}/${nft.id}`}
                    className="text-blue-600"
                    target="_blank"
                    rel="noreferrer"
                  >
                    OpenSea
                  </a>{' '}
                  |{' '}
                  <a
                    href={`https://rinkeby.rarible.com/token/${process.env.NEXT_PUBLIC_NFT_CONTRACT_ADDRESS}:${nft.id}`}
                    target="_blank"
                    rel="noreferrer"
                    className="text-blue-600"
                  >
                    Rarible
                  </a>
                </div>
              </Alert>
            </li>
          );
        })}
      </ul>
    </>
  );
};

export default NftList;
