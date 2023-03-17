import React, {useState} from 'react';
import {Button, StyleSheet, Text, View} from 'react-native';
import {getTokenBalance} from './providers/ethereum/ethereum';
import {generateWallet} from './wallet/generateWallet';
import {Wallet} from './wallet/wallet';

const First = () => {
  const [wallet, setWallet] = useState<Wallet | null>(null);
  const [phrase, setPhrase] = useState('');

  return (
    <View>
      <Text>hello</Text>
      <Button
        title="press me"
        onPress={async () => {
          try {
            console.log('pressed');
            const {wallet, phrase} = await generateWallet();

            setWallet(wallet);
            setPhrase(phrase);

            console.log(
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
    </View>
  );
};

export default First;

const style = StyleSheet.create({});
