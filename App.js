import React, { useState, useEffect } from 'react';
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

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetch('http://localhost:5000/items');

        const items = await data.json();
        console.log(items);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, []);

  if (page === 'inventory') {
    return (
      <>
        <SafeAreaView>
          <Button title='Home' onPress={() => setPage('home')} />
        </SafeAreaView>
        <InventoryTable />
      </>
    );
  } else if (page === 'scan') {
    return (
      <>
        <StatusBar />
        <BarcodeScanner closeFn={() => setPage('home')} />
      </>
    );
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
