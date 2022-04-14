import { FC } from 'react';
import WalletRequired from '@common/components/WalletRequired';
import { NextSeo } from 'next-seo';
import Phantom from '@common/lib/wallet/providers/phantom';

type Props = {};

const GifsView: FC<Props> = () => {
  return (
    <>
      <NextSeo title="GIF Portal" />
      <WalletRequired walletProvider={Phantom} chainId={''}>
        {(wallet) => {
          return <p className="text-center">Connected wallet: {wallet}</p>;
        }}
      </WalletRequired>
    </>
  );
};

export default GifsView;
