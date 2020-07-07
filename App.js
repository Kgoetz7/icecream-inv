import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  StatusBar,
  Button,
} from 'react-native';
import InventoryTable from './Table';
import BarcodeScanner from './BarcodeScanner';

export default function App() {
  const [page, setPage] = useState('home');

  if (page === 'inventory') {
    return (
      <SafeAreaView>
        <Button title='Home' onPress={() => setPage('home')} />
        <InventoryTable />
      </SafeAreaView>
    );
  } else if (page === 'scan') {
    return <BarcodeScanner setPage={setPage} />;
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
          <Button title='Scan In' onPress={() => setPage('scan')} />
          <Text>{'           '}</Text>
          <Button title='Scan Out' onPress={() => setPage('scan')} />
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
