import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  StatusBar,
  TextInput,
  Button,
} from 'react-native';
import Inventory from './Inventory';

export default function App() {
  const [page, setPage] = useState('home');
  const [editMode, setEditMode] = useState(false);
  const [stock, setStock] = useState(5);
  const [suggested, setSuggested] = useState(10);
  const [editSuggestedValue, setEditSuggested] = useState(10);
  const [editStock, setEditStock] = useState(5);

  const updateValues = () => {
    setStock(editStock);
    setSuggested(editSuggestedValue);
    setEditMode(false);
  };

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
