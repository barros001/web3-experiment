import { FC } from 'react';
import useContract from '@modules/wave/lib/hooks/use-contract';
import WaveCount from './WaveCount';
import Form from './WaveForm';
import ConnectedWallet from '@common/components/ConnectedWallet';
import WaveList from './WaveList';
import { useSnackbar } from '@common/components/Snackbar';
import { Prize } from '@modules/wave/lib/types';
import LastAwardedPrize from './LastAwardedPrize';
import useTransactionListener from '@common/lib/hooks/use-transaction-listener';
import Loading from '@common/components/Loading';

type Props = {
  wallet: string;
};

const Wave: FC<Props> = ({ wallet }) => {
  const { listener: transactionListener } = useTransactionListener();
  const { addItem } = useSnackbar();
  const { isWorking, wave, waves, isLoading } = useContract(
    wallet,
    transactionListener,
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
