import { FC } from 'react';
import Alert from '@common/components/Alert';
import { WalletProvider, Wallet } from '@common/lib/wallet/types';

type Props = {
  wallet: Wallet;
  walletProvider: WalletProvider;
};
const InvalidChain: FC<Props> = ({ wallet, walletProvider }) => {
  const chainName = walletProvider.getChainName(wallet.chainId || '');

  return (
    <Alert type="danger">
      You are not connected to the ${chainName}. Please go to $
      {walletProvider.getVendorDetails().name} and connect to the correct
      network.
    </Alert>
  );
};

export default InvalidChain;
