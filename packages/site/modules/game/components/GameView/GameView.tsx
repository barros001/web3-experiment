import { FC } from 'react';
import WalletRequired from '@common/components/WalletRequired';
import { NextSeo } from 'next-seo';
import MetaMask, {
  CHAIN_RINKEBY_TEST_NETWORK,
} from '@common/lib/wallet/providers/meta-mask';
import Game from '@modules/game/components/GameView/Game';

type Props = {};

const GameView: FC<Props> = () => {
  return (
    <>
      <NextSeo title="Metaverse Slayer" />
      <WalletRequired
        walletProvider={MetaMask}
        chainId={CHAIN_RINKEBY_TEST_NETWORK}
      >
        {(wallet) => {
          return <Game wallet={wallet} />;
        }}
      </WalletRequired>
    </>
  );
};

export default GameView;
