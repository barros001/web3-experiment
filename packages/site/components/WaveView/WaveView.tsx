import { FC } from 'react';
import useWallet from '@lib/hooks/use-wallet';
import Loading from '@components/Loading';
import ConnectWallet from './ConnectWallet';
import DownloadWallet from './DownloadWallet';
import Wave from '@components/WaveView/Wave';
import useSnackbar from '@lib/hooks/use-snackbar';
import Snackbar from '@components/Snackbar';

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
