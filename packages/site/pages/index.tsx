import Layout from '@common/components/Layout';
import Link from 'next/link';

export default function NFT() {
  return (
    <>
      <h1 className="text-center text-4xl mb-4">
        <ul>
          <li>
            <Link href="/wave">Wave</Link>
          </li>
          <li>
            <Link href="/nft">NFT</Link>
          </li>
        </ul>
      </h1>
    </>
  );
}

NFT.Layout = Layout;
