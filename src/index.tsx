import React from 'react';
import {Button, Text, View} from 'react-native';
import {generateWallet} from './wallet/generateWallet';

const First = () => {
  return (
    <View>
      <Text>hello</Text>
      <Button
        title="press me"
        onPress={async () => {
          try {
            console.log('pressed');
            const {wallet, phrase} = await generateWallet();
            console.log({phrase, wallet});
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
