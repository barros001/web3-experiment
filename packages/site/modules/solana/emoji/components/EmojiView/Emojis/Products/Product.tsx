import { FC } from 'react';
import { Order, Product } from '@modules/solana/emoji/lib/types';
import Buy from '@modules/solana/emoji/components/EmojiView/Emojis/Products/Buy';

type Props = {
  wallet: string;
  product: Product;
};

const Product: FC<Props> = ({ wallet, product }) => {
  return (
    <span className="p-4 border rounded">
      <img src={product.imageUrl} alt={product.name} className="w-full mb-4" />
      <h2 className="text-center font-bold">{product.name}</h2>
      <p className="text-center text-sm mb-4">{product.description}</p>
      <div className="grid grid-cols-2 items-center">
        <span className="text-center">{product.price.toFixed(2)} USDC</span>
        <Buy wallet={wallet} productId={product.id} />
      </div>
    </span>
  );
};

export default Product;
