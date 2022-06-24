import { FC } from 'react';
import { Order, Product as ProductType } from '@modules/solana/emoji/lib/types';
import Product from '@modules/solana/emoji/components/EmojiView/Emojis/Products/Product';

type Props = {
  wallet: string;
  products: Array<ProductType>;
};

const Products: FC<Props> = ({ wallet, products }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mb-4">
      {products.map((product) => {
        return <Product wallet={wallet} product={product} key={product.id} />;
      })}
    </div>
  );
};

export default Products;
