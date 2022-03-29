import { BigNumberish, ethers } from 'ethers';

const formatEther = (wei: BigNumberish): string => {
  return ethers.utils.formatEther(wei);
};

export default formatEther;
