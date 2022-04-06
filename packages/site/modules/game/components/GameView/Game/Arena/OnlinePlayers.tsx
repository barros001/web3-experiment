import { FC } from 'react';
import { Character as CharacterType } from '@modules/game/lib/types';
import Character from './Character';

type Props = {
  allPlayers: CharacterType[];
};

const OnlinePlayers: FC<Props> = ({ allPlayers }) => {
  if (allPlayers.length === 0) {
    return null;
  }

  return (
    <>
      <p className="text-2xl font-bold text-center mb-4">
        All Online Players ({allPlayers.length}):
      </p>
      <div className="grid grid-cols-4">
        {allPlayers.map((player) => {
          return (
            <div className="text-center" key={player.owner}>
              <Character character={player} />
            </div>
          );
        })}
      </div>
    </>
  );
};

export default OnlinePlayers;
