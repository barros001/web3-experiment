import { Product } from '@modules/solana/emoji/lib/types';
import useSWR from 'swr';

const useProducts = () => {
  const { data: products, error } = useSWR<Product[]>(
    ['/api/solana/emoji/products'],
    async (...args) => {
      return await fetch(args[0]).then((response) => response.json());
    },
    {
      revalidateOnFocus: false,
    }
  );

  return {
    isLoading: !products && !error,
    products,
  };
};

export default useProducts;
