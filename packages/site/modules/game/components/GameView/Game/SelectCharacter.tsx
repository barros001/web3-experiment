import { FC } from 'react';
import { Character } from '@modules/game/lib/types';
import Spinner from '@common/components/Spinner';
import { useSnackbar } from '@common/components/Snackbar';
import Alert from '@common/components/Alert';
import ipfsUrl from '@common/lib/helpers/ipfs-url';

type Props = {
  isMinting?: number;
  allCharacters: Character[];
  mintCharacter: (id: number) => Promise<void>;
};

const SelectCharacter: FC<Props> = ({
  isMinting,
  allCharacters,
  mintCharacter,
}) => {
  const { addItem } = useSnackbar();

  const doMintCharacter = async (id: number) => {
    try {
      await mintCharacter(id);
    } catch (e) {
      addItem(<Alert type="danger">{(e as Error).message}</Alert>);
      console.log(e);
    }
  };

  return (
    <>
      <div className="text-center mb-10 font-bold">
        Mint your HERO. <span className="underline">Choose wisely</span>!
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {allCharacters.map((character) => {
          return (
            <div className="text-center" key={character.index}>
              <img
                src={ipfsUrl(character.imageUri)}
                alt={character.name}
                className="h-[200px] inline-block"
              />
              <div>
                <button
                  type="button"
                  className="border-green-500 rounded text-white bg-green-500 px-3 py-2 w-full mt-3"
                  disabled={!!isMinting}
                  onClick={() => doMintCharacter(character.index)}
                >
                  {isMinting === character.index ? (
                    <Spinner />
                  ) : (
                    `Mint ${character.name}`
                  )}
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default SelectCharacter;
