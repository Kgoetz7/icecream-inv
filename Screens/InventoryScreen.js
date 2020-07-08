import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  SafeAreaView,
  Button,
  StatusBar,
  ActivityIndicator,
  View,
} from 'react-native';
import InventoryTable from '../InventoryTable';

export const InventoryScreen = ({ setPage }) => {
  const [inventoryData, setInventoryData] = useState([]);

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

  if (!inventoryData.length) {
    return (
      <View style={[styles.container, styles.horizontal]}>
        <ActivityIndicator size='large' color='#0000ff' />
      </View>
    );
  }
  return (
    <>
      <SafeAreaView>
        <StatusBar />
        <Button title='Home' onPress={() => setPage('home')} />
      </SafeAreaView>
      <InventoryTable
        data={inventoryData}
        updateData={updateData}
        addData={addData}
      />
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  horizontal: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10,
  },
});
