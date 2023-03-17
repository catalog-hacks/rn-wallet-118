import {
    Keypair,
    Transaction,
    Connection,
    clusterApiUrl,
    sendAndConfirmTransaction,
    SystemProgram,
    LAMPORTS_PER_SOL,
} from '@solana/web3.js';
import * as bip39 from 'bip39';
import { mnemonic } from '../../wallet/wallet';
import { derivePath } from 'ed25519-hd-key';

// let secretKey = Uint8Array.from([
//     202, 171, 192, 129, 150, 189, 204, 241, 142, 71, 205, 2, 81, 97, 2, 176, 48,
//     81, 45, 1, 96, 138, 220, 132, 231, 131, 120, 77, 66, 40, 97, 172, 91, 245, 84,
//     221, 157, 190, 9, 145, 176, 130, 25, 43, 72, 107, 190, 229, 75, 88, 191, 136,
//     7, 167, 109, 91, 170, 164, 186, 15, 142, 36, 12, 23,
// ]);

// export const keypair = Keypair.fromSecretKey(secretKey);
// let toKeypair = Keypair.generate();
// let transaction = new Transaction();
// let connection = new Connection(clusterApiUrl('testnet'));

// transaction.add(
//     SystemProgram.transfer({
//         fromPubkey: keypair.publicKey,
//         toPubkey: toKeypair.publicKey,
//         lamports: 100000000,
//     }),
// );

// export async function senSOL() {
//     console.log("entered");
//     const solTx = await sendAndConfirmTransaction(connection, transaction, [keypair]);
//     console.log('solTx: ', solTx);
// };

export const generateHDWallet = async accountId => {
    const seed = bip39.mnemonicToSeedSync(mnemonic); // (mnemonic, password)
    console.log('seed: ', seed);
    const path = `m/44'/501'/${accountId}'/0'`;
    console.log('path: ', path);
    // const hd = HDKey.fromMasterSeed(seed.toString("hex"));
    // console.log('hd: ', hd);
    const _keypair = Keypair.fromSeed(derivePath(path, seed.toString('hex')).key);
    console.log('_keypair: ', _keypair.publicKey);
    // console.log(`${path} => ${keypair.publicKey.toBase58()}`);
    return _keypair.publicKey.toBase58();
};
