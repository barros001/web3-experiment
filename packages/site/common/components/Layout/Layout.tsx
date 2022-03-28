import { FC } from 'react';
import Wallet from './Wallet';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Snackbar from '@common/components/Snackbar';
import useSnackbar from '@common/lib/hooks/use-snackbar';

type Props = {
  selectedMenuItem?: string;
};

const Layout: FC<Props> = ({ selectedMenuItem, children }) => {
  const { items } = useSnackbar();

  return (
    <>
      <div className="px-4 py-3 border-b">
        <div className="flex justify-between items-center">
          <div className="mr-6 text-4xl">
            <Link href="/">🦄</Link>
          </div>
          <div className="flex items-center">
            <Link href="/wave">
              <a
                className={`mr-5 text-base font-medium text-gray-500 hover:text-gray-900 ${
                  selectedMenuItem === 'wave' ? 'text-gray-900' : null
                }`}
              >
                Wave @ Me!
              </a>
            </Link>
            <Link href="/nft">
              <a
                className={`mr-5 text-base font-medium text-gray-500 hover:text-gray-900 ${
                  selectedMenuItem === 'nft' ? 'text-gray-900' : null
                }`}
              >
                Mint an NFT
              </a>
            </Link>
            <a
              href="https://github.com/barros001/wave-portal"
              target="_blank"
              rel="noreferrer"
              title="Fork me on GitHub!"
              className="text-2xl"
            >
              <FontAwesomeIcon icon={['fab', 'github']} />
            </a>
          </div>
          <div className="ml-auto">
            <Wallet />
          </div>
        </div>
      </div>
      <div className="container pt-10 px-4">{children}</div>
      <Snackbar items={items} />
    </>
  );
};

export default Layout;
