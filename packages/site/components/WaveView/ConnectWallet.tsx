import { FC } from 'react';
import Alert from '@components/Alert';
import useSnackbar from '@lib/hooks/use-snackbar';

type Props = {
  connect: () => Promise<void>;
};

const ConnectWallet: FC<Props> = ({ connect }) => {
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
