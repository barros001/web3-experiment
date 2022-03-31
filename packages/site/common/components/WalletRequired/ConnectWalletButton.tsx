import { FC } from 'react';
import Alert from '@common/components/Alert';
import { useSnackbar } from '@common/components/Snackbar';
import clsx from 'clsx';
import { useWallet } from '@common/lib/wallet/context';
import MetaMask from '@common/lib/wallet/providers/meta-mask';

type Props = {
  className?: string;
};

const ConnectWalletButton: FC<Props> = ({ className }) => {
  const { connect } = useWallet(MetaMask);
  const { addItem } = useSnackbar();

  const doConnect = async () => {
    try {
      await connect();
    } catch (e) {
      addItem(<Alert type="danger">{(e as Error).message}</Alert>);
      console.log(e);
    }
  };

  const buttonClassName = clsx(
    'border-sky-500 rounded text-white bg-sky-500 px-3 py-2',
    className
  );

  return (
    <button className={buttonClassName} onClick={doConnect}>
      Connect Wallet
    </button>
  );
};

export default ConnectWalletButton;
