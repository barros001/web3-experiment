import { FC } from 'react';
import Spinner from '@common/components/Spinner';
import { useSnackbar } from '@common/components/Snackbar';
import Alert from '@common/components/Alert';

type Props = {
  isWorking: boolean;
  initializeAccount: () => Promise<any>;
};

const InitializeAccount: FC<Props> = ({ isWorking, initializeAccount }) => {
  const { addItem } = useSnackbar();

  const doInitialize = async () => {
    try {
      await initializeAccount();
    } catch (e) {
      addItem(<Alert type="danger">{(e as Error).message}</Alert>);
    }
  };

  return (
    <div className="text-center">
      <p className="mb-2 font-bold">
        Before using this app, you must first do a one-time initialization of
        the program account.
      </p>

      <div className="sm:max-w-[300px] m-auto">
        <button
          disabled={isWorking}
          className="w-full border-sky-500 rounded text-white bg-sky-500 px-3 py-2"
          onClick={doInitialize}
        >
          {isWorking ? <Spinner /> : 'Initialize Account'}
        </button>
      </div>
    </div>
  );
};

export default InitializeAccount;
