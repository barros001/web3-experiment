import React, {
  Dispatch,
  FC,
  ReactElement,
  SetStateAction,
  useContext,
  useState,
} from 'react';

type SnackbarContext = {
  items: ReactElement[];
  addItem: (item: ReactElement) => void;
};

const Context = React.createContext<SnackbarContext>({
  items: [],
  addItem: () => {},
});

const SnackbarContextProvider: FC = ({ children }) => {
  const [items, setItems] = useState<ReactElement[]>([]);

  const removeItem = (item: ReactElement) => {
    setItems((items) => {
      return [...items.filter((i) => i !== item)];
    });
  };

  const addItem = (item: ReactElement) => {
    setItems((items) => [...items, item]);
    window.setTimeout(() => {
      removeItem(item);
    }, 5000);
  };

  return (
    <Context.Provider
      value={{
        items,
        addItem,
      }}
    >
      {children}
    </Context.Provider>
  );
};

const useSnackbar = () => {
  return useContext(Context);
};

export { SnackbarContextProvider, useSnackbar };
