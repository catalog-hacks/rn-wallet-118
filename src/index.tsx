import React, { useState } from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';
import { ethProvider, getTokenBalance, sendETH } from './providers/ethereum/ethereum';
import { generateWallet } from './wallet/generateWallet';
import { Wallet } from './wallet/wallet';
import { ethers } from 'ethers';

const First = () => {
  const [wallet, setWallet] = useState<Wallet | null>(null);
  const [phrase, setPhrase] = useState('');
  const [ethBalance, setETHBalance] = useState('');

  return (
    <View>
      <Button
        title="press me"
        onPress={async () => {
          try {
            console.log('pressed');
            const { wallet, phrase } = await generateWallet();

            setWallet(wallet);
            setPhrase(phrase);

            console.log('ETH Balance ', await ethProvider.getBalance(wallet.evmAddress()));

            console.log("USDC Balance",
              await getTokenBalance(
                '0x07865c6E87B9F70255377e024ace6630C1Eaa37F',
                wallet.evmAddress(),
              ),
            );
            // console.log({phrase, wallet});
          } catch (error) {
            console.log('error found at root');
            console.error(error);
          }
        }}
      />
      {wallet && (
        <>
          <Text>{wallet.evmAddress()}</Text>
          <Text>{wallet.btcAddress()}</Text>
          <Text>{phrase}</Text>
        </>
      )}
      <Button
        title="Send ETH"
        onPress={async () => {
          try {
            console.log('pressed send');
            await sendETH({ receiver: '0xB5eDd86d1632D2a59d3ccfF0E49316c16FC13b4B', senderPk: '57bbd81008123e3d998bd32c751b183be4735957c6c27ff19aacd633f9847c98',amount: "0.002" })
          } catch (error) {
            console.log('error found at root');
            console.error(error);
          }
        }}
      />
    </View>
  );
};

export default First;

const style = StyleSheet.create({});
