import React, { FC } from 'react';
import { useWallet } from '@common/lib/wallet/context';
import Spinner from '@common/components/Spinner';
import ConnectWalletButton from './ConnectWalletButton';
import DownloadWalletButton from '@common/components/WalletRequired/DownloadWallet';
import InvalidChain from '@common/components/WalletRequired/InvalidChain';
import { WalletProvider } from '@common/lib/wallet/types';

type Props = {
  walletProvider: WalletProvider;
  chainId: string;
  children: (wallet: string) => React.ReactNode;
};

const WalletRequired: FC<Props> = ({ walletProvider, chainId, children }) => {
  const { isLoading, wallet, isInstalled, connect } = useWallet(walletProvider);

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
        <DownloadWalletButton
          vendorDetails={walletProvider.getVendorDetails()}
        />
      </div>
    );
  }

  if (!wallet) {
    return (
      <div className="text-center">
        <ConnectWalletButton connect={connect} />
      </div>
    );
  }

  if (wallet.chainId !== chainId) {
    return <InvalidChain wallet={wallet} walletProvider={walletProvider} />;
  }

  return <>{children(wallet.publicKey)}</>;
};

export default WalletRequired;
