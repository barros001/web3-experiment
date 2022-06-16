import { FC } from 'react';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';

const ConnectWalletButton: FC = () => {
  return (
    <div className="flex justify-center">
      <WalletMultiButton />
    </div>
  );
};

export default ConnectWalletButton;
