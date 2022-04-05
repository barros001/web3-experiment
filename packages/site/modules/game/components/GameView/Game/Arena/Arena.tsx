import { FC } from 'react';
import { Character as CharacterType } from '@modules/game/lib/types';
import Boss from './Boss';
import Character from './Character';
import Spinner from '@common/components/Spinner';
import { useSnackbar } from '@common/components/Snackbar';
import Alert from '@common/components/Alert';

type Props = {
  isWorking: boolean;
  boss: CharacterType;
  character: CharacterType;
  attack: () => Promise<void>;
};

const Arena: FC<Props> = ({ isWorking, boss, character, attack }) => {
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
        <button
          type="button"
          className="border-green-500 rounded text-white bg-purple-600 px-3 py-2 mt-3"
          disabled={isWorking}
          onClick={doAttack}
        >
          {isWorking ? <Spinner /> : `💥 Attack ${boss.name}`}
        </button>
      </div>
      <div className="text-center mb-4">
        <Character character={character} />
      </div>
    </>
  );
};

export default Arena;
