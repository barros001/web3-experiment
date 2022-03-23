import { FC } from 'react';
import Image from 'next/image';

const Layout: FC = ({ children }) => {
  return (
    <>
      <div className="container text-center mt-4">
        <a
          href="https://github.com/barros001/wave-portal"
          target="_blank"
          rel="noreferrer"
        >
          <Image src="/github.png" width={35} height={35} />
        </a>
      </div>
      <div className="container pt-10 px-4">
        <h1 className="text-center text-4xl mb-4">👋 Hey there!</h1>
        <p className="text-center mb-10">
          Connect your Ethereum wallet and wave at me!
        </p>
        {children}
      </div>
    </>
  );
};

export default Layout;
