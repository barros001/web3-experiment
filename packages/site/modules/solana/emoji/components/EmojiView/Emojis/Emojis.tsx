import { FC } from 'react';
import ConnectedWallet from '@common/components/ConnectedWallet';
import useProducts from '@modules/solana/emoji/lib/hooks/useProducts';
import Loading from '@common/components/Loading';
import Products from '@modules/solana/emoji/components/EmojiView/Emojis/Products';

type Props = {
  wallet: string;
};

const Emojis: FC<Props> = ({ wallet }) => {
  const { products, isLoading } = useProducts();

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div>
      <ConnectedWallet wallet={wallet} />
      <Products products={products} />
    </div>
  );
};

export default Emojis;
