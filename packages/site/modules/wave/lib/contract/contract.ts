import { BigNumberish, ethers } from 'ethers';
import contractABI from './WavePortal.json';
import { getProvider } from '@common/lib/meta-mask';

const getContract = () => {
  const provider = new ethers.providers.Web3Provider(getProvider() as any);
  const signer = provider.getSigner();

  return new ethers.Contract(
    process.env.NEXT_PUBLIC_CONTRACT_ADDRESS as string,
    contractABI.abi,
    signer
  );
};

const formatEther = (wei: BigNumberish): string => {
  return ethers.utils.formatEther(wei);
};

export { getContract, formatEther };
