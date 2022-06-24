import { WalletAdapterNetwork } from '@solana/wallet-adapter-base';
import {
  clusterApiUrl,
  Connection,
  PublicKey,
  Transaction,
} from '@solana/web3.js';
import BigNumber from 'bignumber.js';
import { OrderSchema } from '@modules/solana/emoji/lib/schemas';
import {
  createTransferCheckedInstruction,
  getAssociatedTokenAddress,
  getMint,
} from '@solana/spl-token';
import { Product } from '@modules/solana/emoji/lib/types';

const products: Product[] = require('../products.json');

export default async function handler(req: any, res: any) {
  if (req.method === 'POST') {
    const { error, value } = OrderSchema.validate(req.body);

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

      const usdcAddress = new PublicKey(process.env.SOLANA_USDC_ADDRESS!);
      const usdcMint = await getMint(connection, usdcAddress);

      const { blockhash } = await connection.getLatestBlockhash('finalized');

      const tx = new Transaction({
        recentBlockhash: blockhash,
        feePayer: buyerPublicKey,
      });

      const transferInstruction = createTransferCheckedInstruction(
        await getAssociatedTokenAddress(usdcAddress, buyerPublicKey),
        usdcAddress,
        await getAssociatedTokenAddress(
          usdcAddress,
          new PublicKey(process.env.SOLANA_EMOJI_SELLER_ADDRESS!)
        ),
        buyerPublicKey,
        bigAmount.toNumber() * 10 ** usdcMint.decimals,
        usdcMint.decimals
      );

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
