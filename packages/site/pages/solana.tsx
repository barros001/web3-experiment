import Layout from '@common/components/Layout';
import WalletRequired from '@common/components/WalletRequired';
import Phantom from '@common/lib/wallet/providers/phantom';

export default function Solana() {
  return (
    <WalletRequired walletProvider={Phantom} chainId={''}>
      {(wallet) => {
        return <p className="text-center">{wallet}</p>;
      }}
    </WalletRequired>
  );
}

Solana.Layout = Layout;
