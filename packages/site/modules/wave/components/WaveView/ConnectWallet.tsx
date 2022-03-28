import { FC } from 'react';
import Alert from '@common/components/Alert';
import useSnackbar from '@common/lib/hooks/use-snackbar';
import useWallet from '@common/lib/hooks/use-wallet';

type Props = {};

const ConnectWallet: FC<Props> = () => {
  const { connect } = useWallet();
  const { addItem } = useSnackbar();

  const doConnect = async () => {
    try {
      await connect();
    } catch (e) {
      addItem(<Alert type="danger">{(e as Error).message}</Alert>);
      console.log(e);
    }
  };

  return (
    <>
      <div className="text-center">
        <p className="mb-4 italic font-bold">
          For you to be able to wave at me, you must first connect your wallet.
        </p>
        <div className="mb-4">
          <button
            className="border-sky-500 rounded text-white bg-sky-500 p-3 w-[200px]"
            onClick={doConnect}
          >
            Connect Wallet
          </button>
        </div>
      </div>
    </>
  );
};

export default ConnectWallet;
