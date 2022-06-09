import { FC } from 'react';
import WalletRequired from '@common/components/WalletRequired';
import { NextSeo } from 'next-seo';
import Phantom from '@common/lib/wallet/providers/phantom';
import Gifs from './Gifs';

type Props = {};

const GifsView: FC<Props> = () => {
  return (
    <>
      <NextSeo title="GIF Portal" />
      <WalletRequired walletProvider={Phantom} chainId={''}>
        {(wallet) => {
          return <Gifs wallet={wallet} />;
        }}
      </WalletRequired>
    </>
  );
};

export default GifsView;
