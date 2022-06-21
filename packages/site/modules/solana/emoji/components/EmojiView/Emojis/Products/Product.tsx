import { FC } from 'react';
import { Product } from '@modules/solana/emoji/lib/types';
import Download from '@modules/solana/emoji/components/EmojiView/Emojis/Products/Download';

type Props = {
  product: Product;
};

const Product: FC<Props> = ({ product }) => {
  return (
    <span className="p-4 border rounded">
      <img src={product.imageUrl} alt={product.name} className="w-full mb-4" />
      <h2 className="text-center font-bold">{product.name}</h2>
      <p className="text-center text-sm mb-4">{product.description}</p>
      <div className="grid grid-cols-2 items-center">
        <span className="text-center">{product.price.toFixed(2)} USDC</span>
        <Download
          hash={'QmWWH69mTL66r3H8P4wUn24t1L5pvdTJGUTKBqT11KCHS5'}
          filename={'emojis.zip'}
        />
      </div>
    </span>
  );
};

export default Product;
