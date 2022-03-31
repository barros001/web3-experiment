import { FC } from 'react';
import WalletRequired from '@common/components/WalletRequired';
import { NextSeo } from 'next-seo';
import Nft from '@modules/nft/components/NftView/Nft';
import MetaMask, {
  CHAIN_RINKEBY_TEST_NETWORK,
} from '@common/lib/wallet/providers/meta-mask';

type Props = {};

const NftView: FC<Props> = () => {
  return (
    <>
      <NextSeo title="NFT" />
      <WalletRequired
        walletProvider={MetaMask}
        chainId={CHAIN_RINKEBY_TEST_NETWORK}
      >
        {(wallet) => {
          return <Nft wallet={wallet} />;
        }}
      </WalletRequired>
    </>
  );
};

export default NftView;
