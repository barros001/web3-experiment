import path from 'path';
import { OrderSchema } from '@modules/solana/emoji/lib/schemas';
import { writeFile } from 'fs/promises';
import { Order, Product } from '@modules/solana/emoji/lib/types';

const orders: Order[] = require('../orders.json');
const products: Product[] = require('../products.json');

const get = async (req: any, res: any) => {
  const { buyer } = req.query;

  res.status(200).json(
    orders
      .filter((order) => order.buyer === buyer)
      .map((order) => {
        return {
          ...order,
          product: products.find((product) => product.id === order.productId),
        };
      })
  );
};

const post = async (req: any, res: any) => {
  const { error, value } = OrderSchema.validate(req.body);

  if (error) {
    return res.status(400).json(error);
  }

  try {
    let existingOrder = orders.find(
      (order) =>
        order.buyer === value.buyer && order.productId === value.productId
    );

    if (!existingOrder) {
      orders.push(value);
      await writeFile(
        path.join(__dirname, '/orders.json'),
        JSON.stringify(orders, null, 2),
        { flag: 'w' }
      );

      existingOrder = value;
    }

    res.status(200).send({
      ...existingOrder,
      product: products.find(
        (product) => product.id === existingOrder!.productId
      ),
    });
  } catch (err) {
    res.status(400).send({ message: err });
  }
};

export default async function handler(req: any, res: any) {
  if (req.method === 'GET') {
    await get(req, res);
  } else if (req.method === 'POST') {
    await post(req, res);
  } else {
    res.status(405).send(`Method ${req.method} not allowed`);
  }
}
