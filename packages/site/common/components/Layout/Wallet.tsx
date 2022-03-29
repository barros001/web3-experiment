import { FC } from 'react';
import shortenWallet from '@common/lib/helpers/shorten-wallet';
import WalletRequired from '@common/components/WalletRequired';

const Wallet: FC = ({ children }) => {
  return (
    <WalletRequired simple>
      {(wallet) => {
        return (
          <>
            <span className="font-bold">Wallet:</span>{' '}
            <a
              href={`https://rinkeby.etherscan.io/address/${wallet}`}
              title={wallet}
              target="_blank"
              rel="noreferrer"
              className="text-blue-600"
            >
              {shortenWallet(wallet!)}
            </a>
          </>
        );
      }}
    </WalletRequired>
  );
};

export default Wallet;
