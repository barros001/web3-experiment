import { FC } from 'react';
import useWallet from '@common/lib/hooks/use-wallet';
import ConnectWalletButton from '@common/components/ConnectWalletButton';
import shortenWallet from '@common/lib/helpers/shorten-wallet';
import Spinner from '@common/components/Spinner';

const Wallet: FC = ({ children }) => {
  const { wallet, connect, isLoading } = useWallet();

  if (isLoading) {
    return <Spinner />;
  }

  if (wallet) {
    return (
      <span>
        <span className="font-bold">Wallet:</span>{' '}
        <a
          href={`https://rinkeby.etherscan.io/address/${wallet}`}
          title={wallet}
          target="_blank"
          rel="noreferrer"
        >
          {shortenWallet(wallet)}
        </a>
      </span>
    );
  }

  return (
    <ConnectWalletButton connect={connect} className="px-3 py-1 text-sm" />
  );
};

export default Wallet;
