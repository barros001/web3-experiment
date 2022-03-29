import Layout from '@modules/nft/components/Layout';
import NftView from '@modules/nft/components/NftView';

export async function getStaticProps() {
  return {
    props: {
      layoutProps: {
        selectedMenuItem: 'nft',
      },
    },
  };
}

export default function Nft() {
  return <NftView />;
}

Nft.Layout = Layout;
