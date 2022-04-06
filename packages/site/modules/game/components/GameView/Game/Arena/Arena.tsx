import { FC } from 'react';
import { Character as CharacterType } from '@modules/game/lib/types';
import Boss from './Boss';
import Character from './Character';
import Spinner from '@common/components/Spinner';
import { useSnackbar } from '@common/components/Snackbar';
import Alert from '@common/components/Alert';
import OnlinePlayers from '@modules/game/components/GameView/Game/Arena/OnlinePlayers';

type Props = {
  isWorking: boolean;
  boss: CharacterType;
  character: CharacterType;
  attack: () => Promise<void>;
  mintNewCharacter: () => void;
  allPlayers: CharacterType[];
};

const Arena: FC<Props> = ({
  isWorking,
  boss,
  character,
  attack,
  mintNewCharacter,
  allPlayers,
}) => {
  const { addItem } = useSnackbar();

  const doAttack = async () => {
    try {
      await attack();
    } catch (e) {
      addItem(<Alert type="danger">{(e as Error).message}</Alert>);
      console.log(e);
    }
  };

  return (
    <>
      <div className="text-center mb-4">
        <Boss boss={boss} />
      </div>
      <div className="text-center mb-6">
        {character.hp > 0 ? (
          <button
            type="button"
            className="border-purple-600 rounded text-white bg-purple-600 px-3 py-2 mt-3"
            disabled={isWorking}
            onClick={doAttack}
          >
            {isWorking ? <Spinner /> : `💥 Attack ${boss.name}`}
          </button>
        ) : (
          <>
            <p className="font-bold">☠ You&apos;re dead! ☠</p>
            <button
              type="button"
              className="border-sky-500 rounded text-white bg-sky-500 px-3 py-2 mt-3"
              onClick={mintNewCharacter}
            >
              Mint a new character!
            </button>
          </>
        )}
      </div>
      <div className="text-center mb-8">
        <Character character={character} key={character.index} />
      </div>
      <OnlinePlayers allPlayers={allPlayers} />
    </>
  );
};

export default Arena;
