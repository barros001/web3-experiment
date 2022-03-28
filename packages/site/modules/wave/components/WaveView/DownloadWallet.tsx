import { FC } from 'react';

const DownloadWallet: FC = () => {
  return (
    <div className="text-center">
      <p className="mb-4 italic font-bold">
        For you to be able to wave at me, you must first download and install
        MetaMask.
      </p>
      <a
        href="https://metamask.io/"
        target="_blank"
        rel="noreferrer"
        className="border-orange-500 rounded text-white bg-orange-500 p-3 w-[200px] inline-block"
      >
        Download MetaMask!
      </a>
    </div>
  );
};

export default DownloadWallet;
