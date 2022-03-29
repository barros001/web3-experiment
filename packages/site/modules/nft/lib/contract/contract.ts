import contractABI from './MyEpicNFT.json';
import { getContractWrapper } from '@common/lib/contract';

const getContract = () => {
  return getContractWrapper(
    process.env.NEXT_PUBLIC_NFT_CONTRACT_ADDRESS as string,
    contractABI.abi
  );
};

export { getContract };
