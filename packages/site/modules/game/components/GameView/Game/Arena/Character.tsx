import { FC } from 'react';
import { Character } from '@modules/game/lib/types';

type Props = {
  character: Character;
};

const Character: FC<Props> = ({ character }) => {
  return (
    <div>
      <div className="border rounded inline-block p-5 bg-gray-500">
        <p className="text-white text-2xl mb-4">{character.name}</p>
        <div className="border rounded mb-4">
          <img
            src={character.imageUri}
            alt={character.name}
            className="h-[250px] inline-block"
          />
          <div className="border bg-green-400 text-xs p-1 font-bold">
            {character.hp} / {character.maxHp} HP
          </div>
        </div>
        <div className="text-white text-sm">
          ⚔️ Attack Damage: {character.attackDamage}
        </div>
      </div>
    </div>
  );
};

export default Character;
