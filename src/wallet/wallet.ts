import CryptoAccount from 'send-crypto';
import {Wallet as etherWallet, utils} from 'ethers';
// import {Buffer} from 'buffer';

// import * as ecc from 'tiny-secp256k1';
// import {ECPairFactory} from 'ecpair';
import {BitcoinProviderAS} from '../providers/bitcoin';

export interface UserOp {
  to: string;
  amount: string;
  data: string;
}

export interface TypedData {
  domain: {
    name: string;
    version: string;
    chainId: number;
    verifyingContract: string;
  };
  types: {
    UserOp: {name: string; type: string}[];
    ECDSAExec: {name: string; type: string}[];
  };
  values: {
    userOps: UserOp[];
    nonce: number;
    chainID: number;
    sigChainID: number;
  };
}

class Wallet {
  private readonly _evmAddress: string;
  private readonly _btcAddress: string;
  private readonly _pk: string;

  constructor(evmAddress: string, btcAddress: string, pk: string) {
    this._evmAddress = evmAddress;
    this._btcAddress = btcAddress;
    this._pk = pk;
  }
  async getBalance(asset: string, network = 'testnet'): Promise<string> {
    const account = new CryptoAccount(this._pk, {network});
    return account.getBalance(asset);
  }

  // public readonly getCompressedPublicKey = (): string => {
  //   const publicKey = ECPairFactory(ecc)
  //     .fromPrivateKey(Buffer.from(this._pk.substring(2), 'hex'))
  //     .publicKey.toString('hex');
  //   return publicKey;
  // };

  // public readonly getBTCSigner = () => {
  //   return ECPairFactory(ecc).fromPrivateKey(
  //     Buffer.from(this._pk.substring(2), 'hex'),
  //   );
  // };

  public static generateRandomMnemonic = (): string => {
    // const wallet = etherWallet.fromMnemonic(
    //   utils.entropyToMnemonic(utils.randomBytes(32)),
    // );
    return 'run quality raw mask business syrup today still vacuum pass bone goose evolve invest eye exist second gauge adult region castle imitate utility poem'; //  wallet.mnemonic.phrase;
  };

  public static fromMnemonic = async (mnemonic: string): Promise<Wallet> => {
    const wallet = etherWallet.fromMnemonic(mnemonic);
    const pk = wallet.privateKey;

    const evmAddress = await wallet.getAddress();
    const btcWallet = new BitcoinProviderAS(pk);
    const btcAddress = btcWallet.getPublicKey();

    const w = new Wallet(evmAddress, btcAddress, pk);
    return w;
  };

  readonly evmAddress = (): string => {
    return this._evmAddress;
  };

  readonly btcAddress = (): string => {
    return this._btcAddress;
  };

  async sign(data: TypedData) {
    const wallet = new etherWallet(this._pk);
    const signature = await wallet._signTypedData(
      data.domain,
      data.types,
      data.values,
    );
    return signature;
  }

  internalCryptoAccount(network = 'testnet') {
    return new CryptoAccount(this._pk, {network});
  }

  async publicKey() {}

  async send(
    to: string,
    asset: string,
    amount: string,
    network = 'testnet',
  ): Promise<string> {
    if (asset !== 'BTC') {
      throw new Error('Only BTC is supported');
    }
    const account = new CryptoAccount(this._pk, {network});
    return account.send(to, amount, asset);
  }
}

export {Wallet};
