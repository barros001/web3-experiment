import { FC } from 'react';
import Spinner from '@components/Spinner';

const Loading: FC = () => {
  return (
    <div className="text-center text-2xl">
      <Spinner />
    </div>
  );
};

export default Loading;
