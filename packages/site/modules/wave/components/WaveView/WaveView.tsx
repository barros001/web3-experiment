import { FC } from 'react';
import useWallet from '@common/lib/hooks/use-wallet';
import Loading from '@common/components/Loading';
import useSnackbar from '@common/lib/hooks/use-snackbar';
import Snackbar from '@common/components/Snackbar';
import ConnectWallet from './ConnectWallet';
import DownloadWallet from './DownloadWallet';
import Wave from './Wave';

type Props = {};

const WaveView: FC<Props> = () => {
  const { items } = useSnackbar();
  const { isLoading, wallet, isWalletInstalled, connect } = useWallet();

  if (isLoading) {
    return <Loading />;
  }

  if (!isWalletInstalled) {
    return <DownloadWallet />;
  }

  return (
    <>
      {(wallet && <Wave wallet={wallet} />) || (
        <ConnectWallet connect={connect} />
      )}
      <Snackbar items={items} />
    </>
  );
};

export default WaveView;
