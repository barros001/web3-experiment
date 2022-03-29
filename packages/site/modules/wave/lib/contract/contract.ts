import contractABI from './WavePortal.json';
import { getContractWrapper } from '@common/lib/contract';

const getContract = () => {
  return getContractWrapper(
    process.env.NEXT_PUBLIC_WAVE_CONTRACT_ADDRESS as string,
    contractABI.abi
  );
};

export { getContract };
