import { FC } from 'react';
import { Transaction } from '@common/lib/types';
import Alert from '@common/components/Alert';

type Props = {
  transaction: Transaction;
};

const TransactionSnackbarItem: FC<Props> = ({ transaction }) => {
  const link = () => {
    return (
      <div className="mt-2 text-center">
        <a
          className="text-blue-600 break-all"
          href={`https://rinkeby.etherscan.io/tx/${transaction.hash}`}
          target="_blank"
          rel="noreferrer"
        >
          https://rinkeby.etherscan.io/tx/{transaction.hash}
        </a>
      </div>
    );
  };

  return (
    <>
      <div className="mb-4">
        {(() => {
          switch (transaction.status) {
            case 'mined':
              return (
                <Alert type="success">
                  Transaction successfully mined!
                  {link()}
                </Alert>
              );
            case 'pending':
              return (
                <Alert type="warning">
                  Transaction submitted, waiting for it to be mined...
                  {link()}
                </Alert>
              );
            case 'failed':
              return (
                <Alert type="danger">
                  Transaction failed!
                  {link()}
                </Alert>
              );
          }
        })()}
      </div>
    </>
  );
};

export default TransactionSnackbarItem;
