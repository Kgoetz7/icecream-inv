import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  StatusBar,
  Button,
} from 'react-native';
import Inventory from './Inventory';

export default function App() {
  const [page, setPage] = useState('home');

  if (page === 'inventory') {
    return <Inventory setPage={setPage} />;
  } else {
    return (
      <SafeAreaView style={styles.container}>
        <StatusBar />
        <View
          style={{
            marginVertical: 20,
            width: '80%',
          }}
        >
          <Button title='Scan In' />
          <Text>{'           '}</Text>
          <Button title='Scan Out' />
          <Text>{'           '}</Text>
          <Button title='Inventory' onPress={() => setPage('inventory')} />
        </View>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
});
