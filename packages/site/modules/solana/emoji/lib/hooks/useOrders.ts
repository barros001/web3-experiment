import { Order } from '@modules/solana/emoji/lib/types';
import useSWR from 'swr';

const useOrders = (wallet: string) => {
  const {
    data: orders,
    error,
    mutate,
  } = useSWR<Order[]>(
    ['/api/solana/emoji/orders', wallet],
    async (...args) => {
      return await fetch(`${args[0]}?buyer=${args[1]}`).then((response) =>
        response.json()
      );
    },
    {
      revalidateOnFocus: false,
    }
  );

  const add = async (order: Order) => {
    await fetch('/api/solana/emoji/orders', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(order),
    });

    await mutate();
  };

  const findOrder = (productId: number): Order | null => {
    if (!orders) {
      return null;
    }

    return (
      orders.find(
        (order) => order.buyer === wallet && order.productId === productId
      ) || null
    );
  };

  return {
    isLoading: !orders && !error,
    orders,
    add,
    findOrder,
  };
};

export default useOrders;
