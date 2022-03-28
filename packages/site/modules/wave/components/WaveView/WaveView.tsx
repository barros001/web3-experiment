import { FC } from 'react';
import Wave from './Wave';
import WalletRequired from '@common/components/WalletRequired';
import { NextSeo } from 'next-seo';

type Props = {};

const WaveView: FC<Props> = () => {
  return (
    <>
      <NextSeo title="Wave Portal" />
      <WalletRequired>
        {(wallet) => {
          return <Wave wallet={wallet!} />;
        }}
      </WalletRequired>
    </>
  );
};

export default WaveView;
