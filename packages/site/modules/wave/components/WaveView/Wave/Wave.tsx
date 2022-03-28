import { FC } from 'react';
import LastTransaction from './LastTransaction';
import useContract from '@modules/wave/lib/hooks/use-contract';
import WaveCount from './WaveCount';
import Loading from '@common/components/Loading';
import Form from './WaveForm';
import ConnectedWallet from './ConnectedWallet';
import WaveList from './WaveList';
import useSnackbar from '@common/lib/hooks/use-snackbar';
import { Prize } from '@modules/wave/lib/types';
import LastAwardedPrize from './LastAwardedPrize';

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
