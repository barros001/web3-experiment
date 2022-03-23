import { FC } from 'react';
import LastTransaction from './LastTransaction';
import useContract from '@lib/hooks/use-contract';
import WaveCount from '@components/WaveView/Wave/WaveCount';
import Loading from '@components/Loading';
import Form from '@components/WaveView/Wave/WaveForm';
import ConnectedWallet from '@components/WaveView/Wave/ConnectedWallet';
import WaveList from '@components/WaveView/Wave/WaveList';
import useSnackbar from '@lib/hooks/use-snackbar';
import { Prize } from '@lib/types';
import Alert from '@components/Alert';
import LastAwardedPrize from '@components/WaveView/Wave/LastAwardedPrize';

type Props = {
  wallet: string;
};

const Wave: FC<Props> = ({ wallet }) => {
  const { addItem } = useSnackbar();
  const { isLoading, isWorking, wave, waves } = useContract(
    wallet,
    (transaction) => {
      addItem(<LastTransaction transaction={transaction} />);
    },
    (prize: Prize) => {
      addItem(<LastAwardedPrize prize={prize} />);
    }
  );

  if (isLoading) {
    return <Loading />;
  }

  return (
    <>
      <div className="text-center mb-4">
        <WaveCount waveCount={waves.length} />
        <Form wave={wave} isWorking={isWorking} />
      </div>
      <ConnectedWallet wallet={wallet} />
      <WaveList waves={waves} />
    </>
  );
};

export default Wave;
