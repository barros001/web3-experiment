import { FC } from 'react';
import { Product as ProductType } from '@modules/solana/emoji/lib/types';
import Product from '@modules/solana/emoji/components/EmojiView/Emojis/Products/Product';

type Props = {
  products: Array<ProductType>;
};

const Products: FC<Props> = ({ products }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mb-4">
      {products.map((product) => {
        return <Product product={product} key={product.id} />;
      })}
    </div>
  );
};

export default Products;
