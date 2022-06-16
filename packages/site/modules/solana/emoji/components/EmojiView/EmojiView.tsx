import { FC } from 'react';
import WalletRequired from '@common/components/WalletRequired';
import { NextSeo } from 'next-seo';
import ConnectedWallet from '@common/components/ConnectedWallet';
import SolanaWalletAdapter from '@common/lib/wallet/providers/solana-wallet-adapter';

type Props = {};

const EmojiView: FC<Props> = () => {
  return (
    <>
      <NextSeo title="Solana Pay" />
      <WalletRequired walletProvider={SolanaWalletAdapter} chainId={''}>
        {(wallet) => {
          return <ConnectedWallet wallet={wallet} />;
        }}
      </WalletRequired>
    </>
  );
};

export default EmojiView;
