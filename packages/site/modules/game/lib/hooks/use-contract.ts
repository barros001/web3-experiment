import { useEffect, useState } from 'react';
import { Character } from '@modules/game/lib/types';
import { getContract } from '@modules/game/lib/contract';
import { Transaction } from '@common/lib/types';
import { BigNumber } from 'ethers';

const useContract = (
  wallet: string,
  onTransaction: (transaction: Transaction) => void
) => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [allCharacters, setAllCharacters] = useState<Character[]>([]);
  const [character, setCharacter] = useState<Character | undefined>(undefined);
  const [boss, setBoss] = useState<Character>();
  const [isWorking, setIsWorking] = useState<boolean>(false);
  const [isMinting, setIsMinting] = useState<number | undefined>();

  const buildCharacter = (index: number, txn: any): Character => {
    return {
      index: index,
      name: txn.name,
      imageUri: txn.imageURI,
      hp: txn.hp.toNumber(),
      maxHp: txn.maxHp.toNumber(),
      attackDamage: txn.attackDamage.toNumber(),
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

  const getCurrentCharacter = async (): Promise<Character | undefined> => {
    const txn = await getContract().checkIfUserHasNFT();

    if (!txn.name) {
      return undefined;
    }

    return buildCharacter(txn.characterIndex, txn);
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
          setCharacter(characterToMint);
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
      const characterMintedListener = async (
        owner: string,
        id: BigNumber,
        index: BigNumber
      ) => {
        if (owner.toUpperCase() === wallet.toUpperCase()) {
          setCharacter(await getCurrentCharacter());
        }
      };

      const attackCompleteListener = async (
        newBossHp: BigNumber,
        newPlayerHp: BigNumber
      ) => {
        setBoss((boss) => {
          return { ...boss!, hp: newBossHp.toNumber() };
        });
        setCharacter((character) => {
          return { ...character!, hp: newPlayerHp.toNumber() };
        });
      };

      getContract().on('CharacterNFTMinted', characterMintedListener);
      getContract().on('AttackComplete', attackCompleteListener);

      setCharacter(await getCurrentCharacter());

      // TODO: these are only needed on their respective components
      setAllCharacters(await getAllCharacters());
      setBoss(await getBoss());

      setIsLoading(false);

      return () => {
        getContract().off('CharacterNFTMinted', characterMintedListener);
        getContract().off('AttackComplete', attackCompleteListener);
      };
    };

    initialize();
  }, []);

  return {
    isLoading,
    isWorking,
    isMinting,
    allCharacters,
    character,
    mintCharacter,
    boss,
    attack,
  };
};

export default useContract;
