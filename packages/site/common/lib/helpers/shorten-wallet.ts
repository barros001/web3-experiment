const shortenWallet = (wallet: string): string => {
  return `${wallet.substring(0, 8)}...${wallet.substring(
    wallet.length - 6,
    wallet.length
  )}`;
};

export default shortenWallet;
