import { FC } from 'react';

type Props = {
  waveCount: number;
};

const WaveCount: FC<Props> = ({ waveCount }) => {
  if (waveCount > 0) {
    return (
      <p className="mb-4">
        So far, <span className="font-bold">{waveCount}</span>{' '}
        {waveCount > 1 ? 'waves have' : 'wave has'} been sent!
      </p>
    );
  }

  return <p className="mb-4">Be the first to wave at me!</p>;
};

export default WaveCount;
