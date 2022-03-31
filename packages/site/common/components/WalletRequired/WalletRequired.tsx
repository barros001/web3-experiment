import React, { FC } from 'react';
import { useWallet } from '@common/lib/wallet/context';
import Spinner from '@common/components/Spinner';
import ConnectWalletButton from './ConnectWalletButton';
import DownloadWalletButton from '@common/components/WalletRequired/DownloadWallet';
import InvalidChain from '@common/components/WalletRequired/InvalidChain';
import MetaMask from '@common/lib/wallet/providers/meta-mask';

type Props = {
  children: (wallet: string) => React.ReactNode;
  simple?: boolean;
};

const WalletRequired: FC<Props> = ({ simple = false, children }) => {
  const { isLoading, wallet, isInstalled } = useWallet(MetaMask);

  if (isLoading) {
    return (
      <div className="text-center">
        <Spinner />
      </div>
    );
  }

  if (!isInstalled) {
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
  if (wallet.chainId !== '0x4') {
    if (simple) {
      return null;
    }

    return <InvalidChain />;
  }

  return <>{children(wallet.publicKey)}</>;
};

export default WalletRequired;
