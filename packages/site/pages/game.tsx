import Layout from '@modules/game/components/Layout';
import GameView from '@modules/game/components/GameView';

export async function getStaticProps() {
  return {
    props: {
      layoutProps: {
        selectedMenuItem: 'game',
      },
    },
  };
}

export default function Game() {
  return <GameView />;
}

Game.Layout = Layout;
