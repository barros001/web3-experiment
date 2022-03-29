import { ethers } from 'ethers';
import { getProvider } from '@common/lib/meta-mask';

const getContractWrapper = (address: string, abi: ethers.ContractInterface) => {
  const provider = new ethers.providers.Web3Provider(getProvider() as any);
  const signer = provider.getSigner();

  return new ethers.Contract(address, abi, signer);
};

export { getContractWrapper };
