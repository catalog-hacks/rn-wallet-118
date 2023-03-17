import './shim';

import React from 'react';

import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';

import { Colors } from 'react-native/Libraries/NewAppScreen';
import First from './src';
import '@ethersproject/shims';
import { AppStateProvider } from "./src/contexts/useAppState"

function App(): JSX.Element {
  const backgroundStyle = {
    backgroundColor: Colors.darker,
  };

  return (
    <SafeAreaView style={backgroundStyle}>
      <AppStateProvider>
        <First />
      </AppStateProvider>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
