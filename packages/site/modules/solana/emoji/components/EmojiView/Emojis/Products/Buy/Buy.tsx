import { FC, useState } from 'react';
import Spinner from '@common/components/Spinner';
import Download from '@modules/solana/emoji/components/EmojiView/Emojis/Products/Buy/Download';
import { PurchaseResponse } from '@modules/solana/emoji/lib/types';
import { Keypair, Transaction } from '@solana/web3.js';
import { useSnackbar } from '@common/components/Snackbar';
import Alert from '@common/components/Alert';
import { useConnection, useWallet } from '@solana/wallet-adapter-react';

type Props = {
  productId: number;
};

const Buy: FC<Props> = ({ productId }) => {
  const [isWorking, setIsWorking] = useState<boolean>(false);
  const [isPaid, setIsPaid] = useState<boolean>(false);
  const { addItem } = useSnackbar();
  const { connection } = useConnection();
  const { publicKey, sendTransaction } = useWallet();

  if (isPaid) {
    return (
      <Download
        hash={'QmWWH69mTL66r3H8P4wUn24t1L5pvdTJGUTKBqT11KCHS5'}
        filename={'emojis.zip'}
      />
    );
  }

  const buy = async () => {
    setIsWorking(true);
    try {
      const purchase: PurchaseResponse = await (
        await fetch('/api/solana/emoji/purchase', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            buyer: publicKey,
            orderId: Keypair.generate().publicKey,
            productId: productId,
          }),
        })
      ).json();

      const tx = Transaction.from(Buffer.from(purchase.transaction, 'base64'));
      const txHash = await sendTransaction(tx, connection);

      addItem(
        <Alert type="success">
          Transaction successfully mined!
          <div className="mt-2 text-center">
            <a
              className="text-blue-600 break-all"
              href={`https://solscan.io/tx/${txHash}?cluster=devnet`}
              target="_blank"
              rel="noreferrer"
            >
              https://solscan.io/tx/{txHash}?cluster=devnet
            </a>
          </div>
        </Alert>
      );
      setIsPaid(true);
    } catch (e) {
      addItem(<Alert type="danger">{(e as Error).message}</Alert>);
      console.error(e);
    } finally {
      setIsWorking(false);
    }
  };

  return (
    <button
      className="border-sky-500 rounded text-white bg-sky-500 px-3 py-2 text-center"
      disabled={isWorking}
      onClick={buy}
    >
      {isWorking ? <Spinner /> : 'Buy'}
    </button>
  );
};

export default Buy;
