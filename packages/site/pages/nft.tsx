import Layout from '@common/components/Layout';
import { NextSeo } from 'next-seo';

export async function getStaticProps() {
  return {
    props: {
      layoutProps: {
        selectedMenuItem: 'nft',
      },
    },
  };
}

export default function NFT() {
  return (
    <>
      <NextSeo title="NFT" />
      <h1 className="text-center text-4xl mb-4">
        ⏳ Awesome NFTs coming soon!
      </h1>
    </>
  );
}

NFT.Layout = Layout;
