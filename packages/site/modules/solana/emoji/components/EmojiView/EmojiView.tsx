import { FC } from 'react';
import WalletRequired from '@common/components/WalletRequired';
import { NextSeo } from 'next-seo';
import SolanaWalletAdapter from '@common/lib/wallet/providers/solana-wallet-adapter';
import Emojis from '@modules/solana/emoji/components/EmojiView/Emojis';

type Props = {};

const EmojiView: FC<Props> = () => {
  return (
    <>
      <NextSeo title="Solana Pay" />
      <WalletRequired walletProvider={SolanaWalletAdapter} chainId={''}>
        {(wallet) => {
          return <Emojis wallet={wallet} />;
        }}
      </WalletRequired>
    </>
  );
};

export default EmojiView;
