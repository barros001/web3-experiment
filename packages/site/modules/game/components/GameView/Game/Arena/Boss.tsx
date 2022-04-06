import { FC } from 'react';
import { Character } from '@modules/game/lib/types';
import ipfsUrl from '@common/lib/helpers/ipfs-url';

type Props = {
  boss: Character;
};

const Boss: FC<Props> = ({ boss }) => {
  return (
    <div>
      <div className="border rounded inline-block p-5 bg-red-500 w-full">
        <p className="text-white text-2xl mb-4">🔥 {boss.name} 🔥</p>
        <div className="border rounded bg-white">
          <img
            src={ipfsUrl(boss.imageUri)}
            alt={boss.name}
            className="h-[250px] inline-block"
          />
          <div className="border bg-green-400 text-xs p-1 font-bold">
            {boss.hp} / {boss.maxHp} HP
          </div>
        </div>
      </div>
    </div>
  );
};

export default Boss;
