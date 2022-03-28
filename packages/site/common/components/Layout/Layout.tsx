import { FC } from 'react';
import Image from 'next/image';
import githubLogo from './github.png';
import Wallet from './Wallet';

const Layout: FC = ({ children }) => {
  return (
    <>
      <div className="container mt-4 relative">
        <div className="flex items-center justify-center">
          <a
            href="https://github.com/barros001/wave-portal"
            target="_blank"
            rel="noreferrer"
          >
            <Image src={githubLogo} width={35} height={35} />
          </a>
        </div>
        <div className="absolute inset-y-0 right-0 flex items-center pb-2">
          <Wallet />
        </div>
      </div>
      <div className="container pt-10 px-4">{children}</div>
    </>
  );
};

export default Layout;
