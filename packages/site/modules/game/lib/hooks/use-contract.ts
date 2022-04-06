import { useEffect, useState } from 'react';
import { Character } from '@modules/game/lib/types';
import { getContract } from '@modules/game/lib/contract';
import { Transaction } from '@common/lib/types';
import { BigNumber } from 'ethers';

const useContract = (
  wallet: string,
  onTransaction: (transaction: Transaction) => void,
  onAttack: (name: string, damage: number, newHp: number) => void
) => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [allCharacters, setAllCharacters] = useState<Character[]>([]);
  const [allPlayers, setAllPlayers] = useState<Character[]>([]);
  const [character, setCharacter] = useState<Character | undefined>(undefined);
  const [boss, setBoss] = useState<Character>();
  const [isWorking, setIsWorking] = useState<boolean>(false);
  const [isMinting, setIsMinting] = useState<number | undefined>();

  const unsetCharacter = () => {
    setCharacter(undefined);
  };

  const buildCharacter = (index: number, txn: any): Character => {
    return {
      index: index,
      name: txn.name,
      imageUri: txn.imageURI,
      hp: txn.hp.toNumber(),
      maxHp: txn.maxHp.toNumber(),
      attackDamage: txn.attackDamage.toNumber(),
      damageDealt: txn.damageDealt?.toNumber(),
      owner: txn.owner,
    };
  };

  const getBoss = async (): Promise<Character> => {
    const txn = await getContract().getBigBoss();

    return buildCharacter(-1, txn);
  };

  const getAllCharacters = async (): Promise<Character[]> => {
    const txn = await getContract().getAllDefaultCharacters();

    return (txn as any[]).map((data) => {
      return buildCharacter(data.characterIndex, data);
    });
  };

  const getAllPlayers = async (): Promise<Character[]> => {
    const txn = await getContract().getAllPlayers();

    return (txn as any[])
      .map((data) => {
        return buildCharacter(data.characterIndex, data);
      })
      .filter(
        (character) =>
          character.hp > 0 &&
          character.owner.toUpperCase() !== wallet.toUpperCase()
      );
  };

  const getCurrentCharacter = async (): Promise<Character | undefined> => {
    const txn = await getContract().checkIfUserHasNFT();

    if (!txn.name) {
      return undefined;
    }

    return buildCharacter(txn.characterIndex, txn);
  };

  const refreshCharacters = async (
    refreshCurrentCharacter: boolean = false
  ) => {
    const [boss, character, allPlayers] = await Promise.all([
      getBoss(),
      refreshCurrentCharacter ? getCurrentCharacter() : undefined,
      getAllPlayers(),
    ]);

    setBoss(boss);
    if (refreshCurrentCharacter) {
      setCharacter(character);
    }
    setAllPlayers(allPlayers);
  };

  const attack = async (): Promise<void> => {
    try {
      setIsWorking(true);
      const txn = await getContract().attackBoss();

      onTransaction({
        hash: txn.hash,
        status: 'pending',
      });

      txn
        .wait()
        .then(async () => {
          onTransaction({
            hash: txn.hash,
            status: 'mined',
          });

          await refreshCharacters(true);
          setIsWorking(false);
        })
        .catch(async () => {
          onTransaction({
            hash: txn.hash,
            status: 'failed',
          });
          setIsWorking(false);
        });
    } catch (e) {
      setIsWorking(false);

      throw e;
    }
  };

  const mintCharacter = async (index: number): Promise<void> => {
    const characterToMint = allCharacters.find(
      (character) => character.index === index
    );

    if (!characterToMint) {
      throw Error('Invalid character id');
    }

    try {
      setIsWorking(true);
      setIsMinting(index);
      const txn = await getContract().mintCharacterNFT(characterToMint.index);

      onTransaction({
        hash: txn.hash,
        status: 'pending',
      });

      txn
        .wait()
        .then(async () => {
          onTransaction({
            hash: txn.hash,
            status: 'mined',
          });
          await refreshCharacters(true);
          setIsWorking(false);
          setIsMinting(undefined);
        })
        .catch(async () => {
          onTransaction({
            hash: txn.hash,
            status: 'failed',
          });
          setIsWorking(false);
          setIsMinting(undefined);
        });
    } catch (e) {
      setIsWorking(false);
      setIsMinting(undefined);

      throw e;
    }
  };

  useEffect(() => {
    const initialize = async () => {
      const [allCharacters] = await Promise.all([
        getAllCharacters(),
        refreshCharacters(true),
      ]);

      setAllCharacters(allCharacters);
      setIsLoading(false);
    };

    const initializeListeners = () => {
      const characterMintedListener = async (
        owner: string,
        id: BigNumber,
        index: BigNumber
      ) => {
        await refreshCharacters();
      };

      getContract().on('CharacterNFTMinted', characterMintedListener);

      return () => {
        getContract().off('CharacterNFTMinted', characterMintedListener);
      };
    };

    initialize();
    return initializeListeners();
  }, [wallet]);

  useEffect(() => {
    const initializeListeners = () => {
      const attackCompleteListener = async (
        playerName: string,
        bossDamage: BigNumber,
        newBossHp: BigNumber,
        playerDamage: BigNumber,
        newPlayerHp: BigNumber
      ) => {
        await refreshCharacters();

        if (boss && bossDamage) {
          onAttack(boss.name, bossDamage.toNumber(), newBossHp.toNumber());
        }

        if (playerDamage) {
          onAttack(playerName, playerDamage.toNumber(), newPlayerHp.toNumber());
        }
      };

      getContract().on('AttackComplete', attackCompleteListener);

      return () => {
        getContract().off('AttackComplete', attackCompleteListener);
      };
    };

    if (boss) {
      return initializeListeners();
    }
  }, [boss?.name]);

  return {
    isLoading,
    isWorking,
    isMinting,
    allCharacters,
    character,
    allPlayers,
    unsetCharacter,
    mintCharacter,
    boss,
    attack,
  };
};

export default useContract;
