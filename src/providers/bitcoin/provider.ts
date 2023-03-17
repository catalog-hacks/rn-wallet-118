import * as bitcoin from 'bitcoinjs-lib';

/**
 * Generic interface for a Bitcoin provider
 */
export interface IBitcoinProvider {
  // getUnspent(address: string): Promise<any[]>;
  getBalance(address: string): Promise<string>;
  getTransaction(txId: string): Promise<bitcoin.Transaction>;
  broadcast(tx: bitcoin.Transaction): Promise<string>;
}

export interface BTCCompatProvider extends IBitcoinProvider {
  receiveBTC(address: string, amount: string): Promise<string | void>;
  fundingTransactions(address: string, confirmations: number): Promise<any[]>;
  getSecret(address: string): Promise<string>;
  getPublicKey(): string;
  // sign(hash: Buffer): Buffer;
}
