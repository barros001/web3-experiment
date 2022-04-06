import { FC } from 'react';
import SelectCharacter from '@modules/game/components/GameView/Game/SelectCharacter';
import Arena from '@modules/game/components/GameView/Game/Arena';
import useContract from '@modules/game/lib/hooks/use-contract';
import Loading from '@common/components/Loading';
import useTransactionListener from '@common/lib/hooks/use-transaction-listener';
import { useSnackbar } from '@common/components/Snackbar';
import Alert from '@common/components/Alert';

type Props = {
  wallet: string;
};

const Game: FC<Props> = ({ wallet }) => {
  const { addItem } = useSnackbar();
  const { listener: transactionListener } = useTransactionListener();
  const {
    isLoading,
    isWorking,
    isMinting,
    character,
    unsetCharacter,
    allCharacters,
    mintCharacter,
    boss,
    attack,
    allPlayers,
  } = useContract(wallet, transactionListener, (name, damage, newHp) => {
    addItem(
      <Alert type="info">
        {newHp ? (
          <>
            💥 {name} hit for {damage}!
          </>
        ) : (
          <>☠️ {name} is dead!</>
        )}
      </Alert>
    );
  });

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

  return (
    <Arena
      attack={attack}
      isWorking={isWorking}
      boss={boss!}
      character={character}
      mintNewCharacter={unsetCharacter}
      allPlayers={allPlayers}
    />
  );
};

export default Game;
