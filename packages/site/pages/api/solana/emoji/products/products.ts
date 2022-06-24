import { Product } from '@modules/solana/emoji/lib/types';
const products: Product[] = require('../products.json');

export default function handler(req: any, res: any) {
  if (req.method === 'GET') {
    res.status(200).json(
      products.map((product) => {
        const { hash, filename, ...rest } = product;

        return rest;
      })
    );
  } else {
    res.status(405).send(`Method ${req.method} not allowed`);
  }
}
