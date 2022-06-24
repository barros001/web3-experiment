import { FC } from 'react';

type Props = {
  hash: string;
  filename: string;
};

const Download: FC<Props> = ({ hash, filename }) => {
  return (
    <a
      className="border-sky-500 rounded text-white bg-sky-500 px-3 py-2 text-center"
      href={`https://gateway.ipfscdn.io/ipfs/${hash}?filename=${filename}`}
      download={filename}
    >
      Download emojis
    </a>
  );
};

export default Download;
