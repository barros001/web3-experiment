import { FC } from 'react';
import BaseLayout from '@common/components/Layout';

const Layout: FC = (props) => {
  const { children, ...layoutProps } = props;
  return (
    <BaseLayout {...layoutProps}>
      <h1 className="text-center text-4xl mb-4">🐙 My NFT Collection</h1>
      <p className="text-center mb-10">
        Each unique. Each beautiful. Discover your NFT today.
        <br />
        View entire collection on:{' '}
        <a
          href={`https://testnets.opensea.io/collection/bravonft-m2u9gnth3c`}
          target="_blank"
          rel="noreferrer"
          className="text-blue-600"
        >
          OpenSea
        </a>{' '}
        |{' '}
        <a
          href={`https://rinkeby.rarible.com/collection/${process.env.NEXT_PUBLIC_NFT_CONTRACT_ADDRESS}`}
          target="_blank"
          rel="noreferrer"
          className="text-blue-600"
        >
          Rarible
        </a>
      </p>
      {children}
    </BaseLayout>
  );
};

export default Layout;
