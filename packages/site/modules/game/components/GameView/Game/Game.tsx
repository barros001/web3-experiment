import { FC } from 'react';
import SelectCharacter from '@modules/game/components/GameView/Game/SelectCharacter';
import Arena from '@modules/game/components/GameView/Game/Arena';
import useContract from '@modules/game/lib/hooks/use-contract';
import Loading from '@common/components/Loading';
import useTransactionListener from '@common/lib/hooks/use-transaction-listener';

type Props = {
  wallet: string;
};

const Game: FC<Props> = ({ wallet }) => {
  const { listener: transactionListener } = useTransactionListener();
  const {
    isLoading,
    isWorking,
    isMinting,
    character,
    allCharacters,
    mintCharacter,
    boss,
    attack,
  } = useContract(wallet, transactionListener);

  if (isLoading) {
    return <Loading />;
  }

  if (!character) {
    return (
      <SelectCharacter
        isMinting={isMinting}
        allCharacters={allCharacters}
        mintCharacter={mintCharacter}
      />
    );
  }

  console.log('Character', character);
  return (
    <Arena
      attack={attack}
      isWorking={isWorking}
      boss={boss!}
      character={character}
    />
  );
};

export default Game;
