import { FC } from 'react';
import Spinner from '@common/components/Spinner';

const Loading: FC = () => {
  return (
    <div className="text-center text-2xl">
      <Spinner />
    </div>
  );
};

export default Loading;
