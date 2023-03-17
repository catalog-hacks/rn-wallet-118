import {Wallet} from './wallet';

export const generateWallet = async () => {
  const phrase = Wallet.generateRandomMnemonic();
  const wallet = await Wallet.fromMnemonic(phrase);

  return {phrase, wallet};
};
