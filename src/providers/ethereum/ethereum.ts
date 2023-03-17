import {JsonRpcProvider} from '@ethersproject/providers';
import {ethers} from 'ethers';
import ERC20ABI from '../../constants/erc20abi';

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
