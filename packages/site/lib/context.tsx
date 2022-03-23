import React, {
  Dispatch,
  FC,
  ReactElement,
  SetStateAction,
  useState,
} from 'react';

type Context = {
  snackbarItems: ReactElement[];
  setSnackbarItems: Dispatch<SetStateAction<ReactElement[]>>;
};

const Context = React.createContext<Context>({
  snackbarItems: [],
  setSnackbarItems: () => {},
});

const ContextProvider: FC = ({ children }) => {
  const [snackbarItems, setSnackbarItems] = useState<ReactElement[]>([]);

  return (
    <Context.Provider
      value={{
        snackbarItems,
        setSnackbarItems,
      }}
    >
      {children}
    </Context.Provider>
  );
};

export default Context;
export { ContextProvider };
