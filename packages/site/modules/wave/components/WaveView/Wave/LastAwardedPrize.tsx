import { FC } from 'react';
import { Prize } from '@modules/wave/lib/types';
import Alert from '@common/components/Alert';

type Props = {
  prize: Prize;
};
const LastAwardedPrize: FC<Props> = ({ prize }) => {
  return (
    <Alert type="success">
      <span className="font-bold">{prize.amount}ETH</span> have just been
      awarded to{' '}
      <a
        href={`https://rinkeby.etherscan.io/address/${prize.receiver}`}
        target="_blank"
        rel="noreferrer"
        className="text-blue-600 break-all"
      >
        {prize.receiver}
      </a>
      !
    </Alert>
  );
};

export default LastAwardedPrize;
