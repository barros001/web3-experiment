import { useEffect, useState } from 'react';
import { Product } from '@modules/solana/emoji/lib/types';

const useProducts = () => {
  const [products, setProducts] = useState<Array<Product>>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    fetch('/api/solana/emoji/products')
      .then((response) => response.json())
      .then((data) => {
        setProducts(data);
        setIsLoading(false);
      });
  }, []);

  return {
    isLoading,
    products,
  };
};

export default useProducts;
