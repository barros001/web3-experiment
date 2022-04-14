import WaveView from '@modules/wave/components/WaveView';
import Layout from '@modules/wave/components/Layout';

export async function getStaticProps() {
  return {
    props: {
      layoutProps: {
        selectedMenuItem: 'wave',
      },
    },
  };
}

export default function Wave() {
  return <WaveView />;
}

Wave.Layout = Layout;
