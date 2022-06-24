import { WalletAdapterNetwork } from '@solana/wallet-adapter-base';
import {
  clusterApiUrl,
  Connection,
  PublicKey,
  Transaction,
  SystemProgram,
  LAMPORTS_PER_SOL,
} from '@solana/web3.js';
import BigNumber from 'bignumber.js';
import schema from './schema';
import products from '../products/products.json';

export default async function handler(req: any, res: any) {
  if (req.method === 'POST') {
    const { error, value } = schema.validate(req.body);

    if (error) {
      return res.status(400).json(error);
    }

    const product = products.find((product) => product.id === value.productId);
    if (!product) {
      return res.status(400).json({
        message: 'Product not found',
      });
    }

    try {
      const bigAmount = new BigNumber(product.price);
      const buyerPublicKey = new PublicKey(value.buyer);
      const network = WalletAdapterNetwork.Devnet;
      const endpoint = clusterApiUrl(network);
      const connection = new Connection(endpoint);

      const { blockhash } = await connection.getLatestBlockhash('finalized');

      const tx = new Transaction({
        recentBlockhash: blockhash,
        feePayer: buyerPublicKey,
      });

      const transferInstruction = SystemProgram.transfer({
        fromPubkey: buyerPublicKey,
        lamports: bigAmount.multipliedBy(LAMPORTS_PER_SOL).toNumber(),
        toPubkey: new PublicKey(process.env.SOLANA_EMOJI_SELLER_ID!),
      });

      transferInstruction.keys.push({
        pubkey: new PublicKey(value.orderId),
        isSigner: false,
        isWritable: false,
      });

      tx.add(transferInstruction);

      const serializedTransaction = tx.serialize({
        requireAllSignatures: false,
      });
      const base64 = serializedTransaction.toString('base64');

      res.status(200).json({
        transaction: base64,
      });
    } catch (error) {
      console.error(error);

      res.status(500).json({ message: (error as Error).message });
      return;
    }
  } else {
    res.status(405).send(`Method ${req.method} not allowed`);
  }
}
