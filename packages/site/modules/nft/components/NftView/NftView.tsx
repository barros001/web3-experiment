import { FC } from 'react';
import WalletRequired from '@common/components/WalletRequired';
import { NextSeo } from 'next-seo';
import Nft from '@modules/nft/components/NftView/Nft';

type Props = {};

const NftView: FC<Props> = () => {
  return (
    <>
      <NextSeo title="NFT" />
      <WalletRequired>
        {(wallet) => {
          return <Nft wallet={wallet} />;
        }}
      </WalletRequired>
    </>
  );
};

export default NftView;
