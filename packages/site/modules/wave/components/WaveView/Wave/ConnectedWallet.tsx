import { FC } from 'react';

type Props = {
  wallet: string;
};

const ConnectedWallet: FC<Props> = ({ wallet }) => {
  return (
    <div className="text-center italic mb-4">
      Connected wallet: <span className="underline break-all">{wallet}</span>
    </div>
  );
};

export default ConnectedWallet;
