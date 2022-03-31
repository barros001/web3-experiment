import { useSnackbar } from '@common/components/Snackbar';
import { Transaction } from '@common/lib/types';
import TransactionSnackbarItem from '@common/components/TransactionSnackbarItem';

const useTransactionListener = () => {
  const { addItem } = useSnackbar();

  const listener = (transaction: Transaction) => {
    addItem(<TransactionSnackbarItem transaction={transaction} />);
  };

  return {
    listener,
  };
};

export default useTransactionListener;
