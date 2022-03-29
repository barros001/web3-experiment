import React, { FC } from 'react';
import useWallet from '@common/lib/hooks/use-wallet';
import Spinner from '@common/components/Spinner';
import ConnectWalletButton from './ConnectWalletButton';
import DownloadWalletButton from '@common/components/WalletRequired/DownloadWallet';
import InvalidChain from '@common/components/WalletRequired/InvalidChain';

type Props = {
  children: (wallet: string) => React.ReactNode;
  simple?: boolean;
};

const WalletRequired: FC<Props> = ({ simple = false, children }) => {
  const { isLoading, wallet, isWalletInstalled, chainId } = useWallet();

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

  /* Rinkeby */
  if (chainId !== '0x4') {
    if (simple) {
      return null;
    }

    return <InvalidChain />;
  }

  return <>{children(wallet)}</>;
};

export default WalletRequired;
