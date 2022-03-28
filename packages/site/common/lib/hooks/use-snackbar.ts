import { ReactElement, useContext } from 'react';
import Context from '@common/lib/context';

const useSnackbar = () => {
  const { snackbarItems: items, setSnackbarItems: setItems } =
    useContext(Context);

  const addItem = (item: ReactElement) => {
    setItems((items) => [...items, item]);
    window.setTimeout(() => {
      removeItem(item);
    }, 5000);
  };

  const removeItem = (item: ReactElement) => {
    setItems((items) => {
      return [...items.filter((i) => i !== item)];
    });
  };

  return {
    items,
    addItem,
  };
};

export default useSnackbar;
