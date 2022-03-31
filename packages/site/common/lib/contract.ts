import { ethers } from 'ethers';

const getContractWrapper = (
  address: string,
  abi: ethers.ContractInterface,
  provider: any
) => {
  const web3Provider = new ethers.providers.Web3Provider(provider);
  const signer = web3Provider.getSigner();

  return new ethers.Contract(address, abi, signer);
};

export { getContractWrapper };
