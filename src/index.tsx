import React, { useState } from 'react';
import { Button, Image, Pressable, StyleSheet, Text, View } from 'react-native';
import {
  ethProvider,
  getTokenBalance,
  sendETH,
} from './providers/ethereum/ethereum';
import { generateWallet } from './wallet/generateWallet';
import { Wallet } from './wallet/wallet';
import { ethers } from 'ethers';
import { generateHDWallet, sendSOL } from './providers/solana/solana';
import logo from './assets/images/cat.png';
import { useAppState } from './contexts/useAppState';

const First = () => {
  const [solHDAccounts, setSOLHDAccounts] = useState<string[]>([]);

  const {
    wallet,
    setWallet,
    phrase,
    setPhrase,
    setETHBalance,
    setUSDCBalance,
    ethReciever,
    setETHReciever,
    solReciever,
    setSOLReciever,
    ethHDAccounts,
    setETHHDAccounts,
  } = useAppState();

  let solWallets = []

  return (
    <View style={styles.container}>
      <Button
        title="Generate Wallet"
        onPress={async () => {
          try {
            console.log('pressed');
            const { wallet, phrase } = await generateWallet();
            const ethBalance = await ethProvider.getBalance(
              wallet.evmAddress(),
            );
            const usdcBalance = await getTokenBalance(
              '0x07865c6E87B9F70255377e024ace6630C1Eaa37F',
              wallet.evmAddress(),
            );

            setWallet(wallet);
            setPhrase(phrase);
            setETHBalance(ethBalance.toHexString());
            setUSDCBalance(usdcBalance);
          } catch (error) {
            console.log('error found at root');
            console.error(error);
          }
        }}
      />
      <View style={styles.logo}>
        <Image style={styles.image} source={logo} />
        <Text style={styles.title}>Catalog</Text>
      </View>
      {wallet && (
        <>
          <View style={styles.buttons}>
            <Pressable
              onPress={async () => {
                try {
                  console.log('pressed send');
                  await sendETH({
                    receiver: '0xB5eDd86d1632D2a59d3ccfF0E49316c16FC13b4B',
                    senderPk:
                      '57bbd81008123e3d998bd32c751b183be4735957c6c27ff19aacd633f9847c98',
                    amount: '0.002',
                  });
                } catch (error) {
                  console.log('error found at root');
                  console.error(error);
                }
              }}>
              {({ pressed }) => (
                <View style={styles.buttonContainer}>
                  {/* <Feather
                    name="arrow-up-right"
                    size={30}
                    color="#FAFAFA"
                    style={{ opacity: pressed ? 0.5 : 1, backgroundColor: "#2CC995", width: 40, height: 40, borderRadius: 20, padding: 5 }}
                  /> */}
                  <Text style={{ color: '#FAFAFA' }}>Send ETH</Text>
                </View>
              )}
            </Pressable>
            <Pressable>
              {({ pressed }) => (
                <View style={styles.buttonContainer}>
                  {/* <Feather
                    name="arrow-down-left"
                    size={30}
                    color="#FAFAFA"
                    style={{ opacity: pressed ? 0.5 : 1, backgroundColor: "#2CC995", width: 40, height: 40, borderRadius: 20, padding: 5 }}
                  /> */}
                  <Text style={{ color: '#FAFAFA' }}>Recieve ETH</Text>
                </View>
              )}
            </Pressable>
          </View>
          <View
            style={styles.separator}
            lightColor="#FAFAFA"
            darkColor="#111318"
          />
          <Text style={styles.text}>{wallet.evmAddress()}</Text>
          <Text style={styles.text}>{wallet.btcAddress()}</Text>
          <Text style={styles.text}>{phrase}</Text>
        </>
      )}
      {/* <Button
        title="Send SOL"
        onPress={async () => {
          try {
            console.log('pressed send sol');
            await sendSOL()
          } catch (error) {
            console.log('error found at root');
            console.error(error);
          }
        }}
      /> */}
      <Button
        title="Send BTC"
        onPress={async () => {
          try {
            console.log('pressed send btc');
          } catch (error) {
            console.log('error found at root');
            console.error(error);
          }
        }}
      />
      <Button
        title="Generate SOL HD Wallet"
        onPress={async () => {
          try {
            const _solHDWallet = await generateHDWallet(3);
            setSOLHDAccounts(p => {
              return [...p, _solHDWallet];
            });

          } catch (error) {
            console.log('error found while generating sol hd wallet');
            console.error(error);
          }
        }}
      />
      {!!solHDAccounts.length &&
        solHDAccounts.map((solAccount, i) => {
          return (
            <View key={solAccount} style={styles.accountCard}>
              <Text style={styles.title}>Account {i + 1}</Text>
              <Text style={styles.text}>{solAccount}</Text>
            </View>
          );
        })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'space-evenly',
    gap: 20,
    backgroundColor: '#111318',
  },
  logo: {
    alignItems: 'center',
    justifyContent: 'center',
    gap: 20,
    backgroundColor: '#111318',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FAFAFA',
  },
  buttons: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 30,
    backgroundColor: '#111318',
    color: '#FAFAFA',
  },
  buttonContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#111318',
    color: '#FAFAFA',
    gap: 5,
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#111318',
  },
  text: {
    color: '#FAFAFA',
  },
  accountCard: {
    padding: '16px',
    backgroundColor: '#3A3A3A',
    height: 50,
  },
});

export default First;
