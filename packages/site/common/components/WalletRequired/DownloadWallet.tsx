import { FC } from 'react';

const DownloadWalletButton: FC = () => {
  return (
    <a
      href="https://metamask.io/"
      target="_blank"
      rel="noreferrer"
      className="border-orange-500 rounded text-white bg-orange-500 px-3 py-2"
    >
      Download MetaMask
    </a>
  );
};

export default DownloadWalletButton;
