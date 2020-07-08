import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  StatusBar,
  Button,
} from 'react-native';
import InventoryTable from './InventoryTable';
import BarcodeScanner from './BarcodeScanner';

export default function App() {
  const [page, setPage] = useState('home');
  const [inventoryData, setInventoryData] = useState([]);
  const [scanType, setScanType] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetch('https://icecreamapp-api.herokuapp.com/items');

        const items = await data.json();
        setInventoryData(items);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, []);

  const updateData = async (flavor, stock, suggested) => {
    try {
      const data = await fetch('https://icecreamapp-api.herokuapp.com/items', {
        method: 'put',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          flavor,
          stock,
          suggested,
        }),
      });

      const items = await data.json();
      setInventoryData(items);
    } catch (err) {
      console.log(err);
    }
  };

  const addData = async (flavor, stock, suggested) => {
    try {
      const data = await fetch('https://icecreamapp-api.herokuapp.com/items', {
        method: 'post',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          flavor,
          stock,
          suggested,
        }),
      });

      const items = await data.json();
      setInventoryData(items);
    } catch (err) {
      console.log(err);
    }
  };

  const handleScan = async (flavor) => {
    try {
      const data = await fetch('https://icecreamapp-api.herokuapp.com/stock', {
        method: 'put',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          flavor,
          type: scanType,
        }),
      });

      const response = await data.json();
      setInventoryData(response.allItems);
      alert(
        `${scanType === 'increment' ? 'Added' : 'Removed'} 1 ${flavor} ${
          scanType === 'increment' ? 'to' : 'from'
        } stock. ${response.updatedItem[0].stock} left.`
      );
    } catch (err) {
      console.log(err);
    }
  };

  if (page === 'inventory') {
    return (
      <>
        <SafeAreaView>
          <Button title='Home' onPress={() => setPage('home')} />
        </SafeAreaView>
        <InventoryTable
          data={inventoryData}
          updateData={updateData}
          addData={addData}
        />
      </>
    );
  } else if (page === 'scan') {
    return (
      <>
        <StatusBar />
        <BarcodeScanner
          closeFn={() => setPage('home')}
          onScan={(barcodeData) => {
            handleScan(barcodeData);
          }}
        />
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
          <Button
            title='Scan In'
            onPress={() => {
              setPage('scan');
              setScanType('increment');
            }}
          />
          <Text>{'           '}</Text>
          <Button
            title='Scan Out'
            onPress={() => {
              setPage('scan');
              setScanType('decrement');
            }}
          />
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
