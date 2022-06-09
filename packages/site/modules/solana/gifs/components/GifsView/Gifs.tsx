import { FC, useState } from 'react';
import ConnectedWallet from '@common/components/ConnectedWallet';
import Form from '@modules/solana/gifs/components/GifsView/Form';

const GIFS = [
  'https://media0.giphy.com/media/8beCqjMLtgKm4/giphy.gif?cid=ecf05e47f19n57cib301joqevvie2zpkjnbi4of5ywmnaazk&rid=giphy.gif&ct=g',
  'https://media4.giphy.com/media/11AU23tJXaqqL6/giphy.gif?cid=ecf05e47nxvndca7klaouwq3ifyvpz156wgipqtuu5pt0nh1&rid=giphy.gif&ct=g',
  'https://media3.giphy.com/media/VspTn3CPKAHoA/giphy.gif?cid=ecf05e471p7mmuo39ehut6vk34m7k29zjcv2gb3yh06evepy&rid=giphy.gif&ct=g',
  'https://media1.giphy.com/media/xT1R9G08F4BetYOSDC/giphy.gif?cid=ecf05e47xkgqerjvq2co5vu20ajk731qopizxj8evl60vs0l&rid=giphy.gif&ct=g',
];

type Props = {
  wallet: string;
};

const Gifs: FC<Props> = ({ wallet }) => {
  const [isWorking, setIsWorking] = useState<boolean>(false);
  const [gifs, setGifs] = useState<string[]>(GIFS);

  const submitGif = async (url: string): Promise<void> => {
    setIsWorking(true);
    await new Promise((resolve) => {
      window.setTimeout(() => resolve(null), 1000);
    });
    setGifs([...gifs, url]);
    setIsWorking(false);
  };

  return (
    <>
      <div className="mb-4">
        <Form isWorking={isWorking} submitGif={submitGif} />
      </div>

      <ConnectedWallet wallet={wallet} />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mb-4">
        {gifs.map((gif, key) => {
          return <img src={gif} alt={gif} className="w-full" key={key} />;
        })}
      </div>
    </>
  );
};

export default Gifs;
