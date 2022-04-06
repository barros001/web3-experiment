import { FC } from 'react';
import { Character } from '@modules/game/lib/types';
import ipfsUrl from '@common/lib/helpers/ipfs-url';
import shortenWallet from '@common/lib/helpers/shorten-wallet';

type Props = {
  character: Character;
};

const Character: FC<Props> = ({ character }) => {
  return (
    <div>
      <div className="border rounded inline-block p-5 bg-gray-400 w-full">
        <p className="text-white text-2xl mb-4">{character.name}</p>
        <div className="border rounded mb-4 bg-white">
          <img
            src={ipfsUrl(character.imageUri)}
            alt={character.name}
            className="h-[250px] inline-block"
          />
          <div className="border bg-green-400 text-xs p-1 font-bold">
            {character.hp} / {character.maxHp} HP
          </div>
        </div>
        <div className="text-white text-sm">
          ⚔️ Attack Damage: {character.attackDamage}
          <br />
          💥 Damaged Dealt: {character.damageDealt}
          <br />
          Owner:{' '}
          <a
            href={`https://rinkeby.etherscan.io/address/${character.owner}`}
            target="_blank"
            rel="noreferrer"
            className="text-blue-600 break-all"
          >
            {shortenWallet(character.owner)}
          </a>
        </div>
      </div>
    </div>
  );
};

export default Character;
