import React, { FC } from 'react';
import useWallet from '@common/lib/hooks/use-wallet';
import Spinner from '@common/components/Spinner';
import ConnectWalletButton from './ConnectWalletButton';
import DownloadWalletButton from '@common/components/WalletRequired/DownloadWallet';

type Props = {
  children: (wallet: string) => React.ReactNode;
};

const WalletRequired: FC<Props> = ({ children }) => {
  const { isLoading, wallet, isWalletInstalled } = useWallet();

  if (isLoading) {
    return (
      <div className="text-center">
        <Spinner />
      </div>
    );
  }

  if (!isWalletInstalled) {
    return (
      <div className="text-center">
        <DownloadWalletButton />
      </div>
    );
  }

  if (!wallet) {
    return (
      <div className="text-center">
        <ConnectWalletButton />
      </div>
    );
  }

  return <>{children(wallet)}</>;
};

export default WalletRequired;
