import { FC, ReactElement } from 'react';

export type Props = {
  items: ReactElement[];
};

const Snackbar: FC<Props> = ({ items }) => {
  return (
    <div className="fixed bottom-0 left-1/2 -translate-x-1/2 container max-w-[600px] px-4">
      {items.map((item, key) => {
        return (
          <div key={key} className="shadow-xl">
            {item}
          </div>
        );
      })}
    </div>
  );
};

export default Snackbar;
