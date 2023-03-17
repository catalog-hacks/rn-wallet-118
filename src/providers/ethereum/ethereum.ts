import { JsonRpcProvider } from '@ethersproject/providers';
import { Wallet, ethers } from 'ethers';
import ERC20ABI from '../../constants/erc20abi';
import { send } from 'process';
import { address } from 'bitcoinjs-lib';

type sendTxProps = {
  senderPk: string;
  receiver: string;
  amount: string;
};

export const ethProvider = new JsonRpcProvider(
  'https://goerli.infura.io/v3/b863ead591d54e77be1db79ef34797a3',
  5,
);

export const getTokenBalance = async (
  tokenAddress: string,
  senderAddress: string,
) => {
  const tokenContract = new ethers.Contract(
    tokenAddress,
    ERC20ABI,
    ethProvider,
  );
  const balance = (await tokenContract.balanceOf(senderAddress)).toString();
  return balance;
};

export const sendETH = async ({ receiver, senderPk, amount }: sendTxProps) => {
  const wallet = new ethers.Wallet(senderPk, ethProvider);
  const tx: ethers.providers.TransactionRequest = {
    to: receiver,
    value: ethers.utils.parseEther(amount),
  };
  console.log('tx: ', tx);
  const txResponse = await wallet.sendTransaction(tx);
  console.log('txResponse: ', txResponse);
};

// 0x7684b983B4b33E6486833152FB0124f1841bd2Ba
