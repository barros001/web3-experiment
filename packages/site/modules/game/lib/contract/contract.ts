import contractABI from './MyEpicGame.json';
import { getContractWrapper } from '@common/lib/contract';
import MetaMask from '@common/lib/wallet/providers/meta-mask';

const getContract = () => {
  return getContractWrapper(
    process.env.NEXT_PUBLIC_GAME_CONTRACT_ADDRESS as string,
    contractABI.abi,
    MetaMask.getProvider()
  );
};

export { getContract };
