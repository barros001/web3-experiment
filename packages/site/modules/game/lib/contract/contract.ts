import contractABI from './MyEpicGame.json';
import { getContractWrapper } from '@common/lib/contract';
import MetaMask from '@common/lib/wallet/providers/meta-mask';
import { Contract } from 'ethers';

let contract: Contract;

const getContract = () => {
  if (!contract) {
    contract = getContractWrapper(
      process.env.NEXT_PUBLIC_GAME_CONTRACT_ADDRESS as string,
      contractABI.abi,
      MetaMask.getProvider()
    );
  }

  return contract;
};

export { getContract };
