import { FC } from 'react';
import { Wave } from '@lib/types';
import Alert from '@components/Alert';
import Spinner from '@components/Spinner';

type Props = {
  waves: Wave[];
};

const WaveList: FC<Props> = ({ waves }) => {
  if (waves.length === 0) {
    return null;
  }

  return (
    <>
      <h2 className="mb-4 font-bold text-xl">Latest waves ({waves.length}):</h2>
      <ul>
        {waves.map((wave, key) => {
          return (
            <li key={key}>
              <Alert type={wave.status === 'pending' ? 'warning' : 'info'}>
                <div className="text-left">
                  <span className="font-bold">From:</span>{' '}
                  <a
                    href={`https://rinkeby.etherscan.io/address/${wave.waver}`}
                    target="_blank"
                    rel="noreferrer"
                    className="text-blue-600 break-all"
                  >
                    {wave.waver}
                  </a>
                  <br />
                  <span className="font-bold">Message:</span> {wave.message}
                  <br />
                  <span className="font-bold">When:</span>{' '}
                  {wave.status === 'pending' ? (
                    <Spinner />
                  ) : (
                    wave.timestamp.toLocaleString()
                  )}
                </div>
              </Alert>
            </li>
          );
        })}
      </ul>
    </>
  );
};

export default WaveList;
