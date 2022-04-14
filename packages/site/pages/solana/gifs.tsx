import Layout from '@modules/solana/gifs/components/Layout';
import GifsView from '@modules/solana/gifs/components/GifsView';

export async function getStaticProps() {
  return {
    props: {
      layoutProps: {
        selectedMenuItem: 'gifs',
      },
    },
  };
}

export default function Gifs() {
  return <GifsView />;
}

Gifs.Layout = Layout;
