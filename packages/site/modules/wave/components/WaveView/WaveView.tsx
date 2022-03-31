import { FC } from 'react';
import Wave from './Wave';
import WalletRequired from '@common/components/WalletRequired';
import { NextSeo } from 'next-seo';
import MetaMask, {
  CHAIN_RINKEBY_TEST_NETWORK,
} from '@common/lib/wallet/providers/meta-mask';

type Props = {};

const WaveView: FC<Props> = () => {
  return (
    <>
      <NextSeo title="Wave Portal" />
      <WalletRequired
        walletProvider={MetaMask}
        chainId={CHAIN_RINKEBY_TEST_NETWORK}
      >
        {(wallet) => {
          return <Wave wallet={wallet!} />;
        }}
      </WalletRequired>
    </>
  );
};

export default WaveView;
