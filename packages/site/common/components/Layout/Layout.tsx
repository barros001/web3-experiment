import { FC } from 'react';
import Image from 'next/image';
import githubLogo from './github.png';

const Layout: FC = ({ children }) => {
  return (
    <>
      <div className="container text-center mt-4">
        <a
          href="https://github.com/barros001/wave-portal"
          target="_blank"
          rel="noreferrer"
        >
          <Image src={githubLogo} width={35} height={35} />
        </a>
      </div>
      <div className="container pt-10 px-4">{children}</div>
    </>
  );
};

export default Layout;
