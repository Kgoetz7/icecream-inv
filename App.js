import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  StatusBar,
  Button,
  TouchableHighlight,
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
        } stock. ${response.updatedItem.stock} left.`
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
            marginTop: '20%',
            width: '80%',
          }}
        >
          <TouchableHighlight
            style={styles.homeBtn}
            onPress={() => {
              setPage('scan');
              setScanType('increment');
            }}
          >
            <Text style={styles.btnText}>Scan In</Text>
          </TouchableHighlight>
          <Text>{'           '}</Text>
          <TouchableHighlight
            style={styles.homeBtn}
            onPress={() => {
              setPage('scan');
              setScanType('decrement');
            }}
          >
            <Text style={styles.btnText}>Scan Out</Text>
          </TouchableHighlight>
          <Text>{'           '}</Text>
          <TouchableHighlight
            style={styles.homeBtn}
            onPress={() => setPage('inventory')}
          >
            <Text style={styles.btnText}>View Inventory</Text>
          </TouchableHighlight>
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
  homeBtn: {
    backgroundColor: '#1976d2',
    paddingVertical: 30,
  },
  btnText: {
    color: '#fff',
    textAlign: 'center',
    textTransform: 'uppercase',
  },
});
