import { Connection, PublicKey, clusterApiUrl } from '@solana/web3.js';
import {
  Program,
  AnchorProvider,
  web3,
  Wallet,
  Idl,
} from '@project-serum/anchor';
import Phantom from '@common/lib/wallet/providers/phantom';
import idl from './idl.json';
import accountKeypair from '@modules/solana/account-keypair.json';

const PREFLIGHT_COMMITMENT = 'processed';

const { SystemProgram } = web3;

const baseAccount = web3.Keypair.fromSecretKey(
  new Uint8Array(Object.values(accountKeypair._keypair.secretKey))
);

const getContract = () => {
  const network = clusterApiUrl('devnet');

  const connection = new Connection(network, PREFLIGHT_COMMITMENT);

  const provider = new AnchorProvider(
    connection,
    Phantom.getProvider() as Wallet,
    {
      preflightCommitment: PREFLIGHT_COMMITMENT,
    }
  );

  const program = new Program(
    idl as Idl,
    new PublicKey(idl.metadata.address),
    provider
  );

  const getAccount = async () => {
    try {
      return await program.account.baseAccount.fetch(baseAccount.publicKey);
    } catch (e: any) {
      if (!e.message.includes('Account does not exist')) {
        throw e;
      }

      return null;
    }
  };

  const initializeAccount = async () => {
    await program.rpc.initialize({
      accounts: {
        baseAccount: baseAccount.publicKey,
        user: provider.wallet.publicKey,
        systemProgram: SystemProgram.programId,
      },
      signers: [baseAccount],
    });

    return await getAccount();
  };

  const addGif = async (url: string) => {
    await program.rpc.addGif(url, {
      accounts: {
        baseAccount: baseAccount.publicKey,
        user: provider.wallet.publicKey,
      },
    });

    return await getAccount();
  };

  return {
    getAccount,
    initializeAccount,
    addGif,
  };
};

export { getContract };
