import { FC, useEffect, useMemo, useState } from 'react';
import Spinner from '@common/components/Spinner';
import Download from '@modules/solana/emoji/components/EmojiView/Emojis/Products/Buy/Download';
import {
  PurchaseResponse,
  TransactionStatus,
} from '@modules/solana/emoji/lib/types';
import {
  Keypair,
  PublicKey,
  SignatureStatus,
  Transaction,
} from '@solana/web3.js';
import { useSnackbar } from '@common/components/Snackbar';
import Alert from '@common/components/Alert';
import { useConnection, useWallet } from '@solana/wallet-adapter-react';
import { findReference, FindReferenceError } from '@solana/pay';
import useOrders from '@modules/solana/emoji/lib/hooks/useOrders';

type Props = {
  wallet: string;
  productId: number;
};

const Buy: FC<Props> = ({ wallet, productId }) => {
  const { findOrder, add: addOrder, isLoading } = useOrders(wallet);
  const [isWorking, setIsWorking] = useState<boolean>(false);
  const [status, setStatus] = useState<TransactionStatus>(
    TransactionStatus.initial
  );
  const { addItem } = useSnackbar();
  const { connection } = useConnection();
  const { sendTransaction } = useWallet();

  const orderId = useMemo(() => Keypair.generate().publicKey.toString(), []);

  const buy = async () => {
    setIsWorking(true);
    try {
      const purchase: PurchaseResponse = await (
        await fetch('/api/solana/emoji/purchases', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            buyer: wallet,
            orderId: orderId,
            productId: productId,
          }),
        })
      ).json();

      const tx = Transaction.from(Buffer.from(purchase.transaction, 'base64'));
      const txHash = await sendTransaction(tx, connection);

      addItem(
        <Alert type="success">
          Transaction sent!
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

      setStatus(TransactionStatus.submitted);
    } catch (e) {
      addItem(<Alert type="danger">{(e as Error).message}</Alert>);
      console.error(e);
    } finally {
      setIsWorking(false);
    }
  };

  useEffect(() => {
    if (isLoading) {
      return;
    }

    if (findOrder(productId)) {
      setStatus(TransactionStatus.paid);
    }
  }, [isLoading]);

  useEffect(() => {
    if (status !== TransactionStatus.submitted) {
      return;
    }

    setIsWorking(true);
    const interval = setInterval(async () => {
      try {
        const result = (await findReference(
          connection,
          new PublicKey(orderId)
        )) as unknown as SignatureStatus; // looks like solana /pay types are wrong

        if (
          result.confirmationStatus === 'confirmed' ||
          result.confirmationStatus === 'finalized'
        ) {
          clearInterval(interval);
          await addOrder({
            buyer: wallet,
            orderId: orderId,
            productId: productId,
          });
          setStatus(TransactionStatus.paid);
          setIsWorking(false);
          addItem(<Alert type="success">Thank you for your purchase!</Alert>);
        }
      } catch (e) {
        if (e instanceof FindReferenceError) {
          return null;
        }

        addItem(<Alert type="danger">{(e as Error).message}</Alert>);
      } finally {
        setIsWorking(false);
      }
    }, 2000);

    return () => {
      clearInterval(interval);
    };
  }, [wallet, productId, status, orderId]);

  const order = findOrder(productId);

  if (status === TransactionStatus.paid && order && order.product) {
    return (
      <Download hash={order.product.hash} filename={order.product.filename} />
    );
  }

  return (
    <button
      className="border-sky-500 rounded text-white bg-sky-500 px-3 py-2 text-center"
      disabled={isWorking || isLoading}
      onClick={buy}
    >
      {isWorking || isLoading ? <Spinner /> : 'Buy'}
    </button>
  );
};

export default Buy;
