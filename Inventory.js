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
import styles from './styles';

export default function Inventory({ setPage }) {
  const [editMode, setEditMode] = useState(false);
  const [stock, setStock] = useState(5);
  const [suggested, setSuggested] = useState(10);
  const [editSuggestedValue, setEditSuggested] = useState(10);
  const [editStock, setEditStock] = useState(5);

  const updateValues = () => {
    setStock(Number(editStock));
    setSuggested(editSuggestedValue);
    setEditMode(false);
  };
  const gijoe = 68
  function test(){
    console.log(gijoe)
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style='auto' />
      <View style={styles.homeBtnContainer}>
        <Button title='< Home' onPress={() => setPage('home')} />
      </View>

      <View style={{ marginBottom: 20 }}>
        <View style={styles.tableHeader}>
          <Text style={{ minWidth: 100 }}>Flavor</Text>
          <Text>Stock</Text>
          <Text>Suggested</Text>
          <Text></Text>
        </View>
        <View style={styles.tableData}>
          <Text style={{ padding: 5 }}>IceCreamName</Text>
          <Text style={styles.tableCell}>{stock}</Text>
          <Text style={styles.tableCell}>{suggested}</Text>
          <Button
            title={editMode ? `Cancel` : 'Edit'}
            style={{ marginLeft: 10 }}
            onPress={() => setEditMode(!editMode)}
          />
        </View>
        <View
          style={
            (styles.tableHeader,
            {
              display: editMode ? 'flex' : `none`,
            })
          }
        >
          <Text style={{ padding: 5, minWidth: 100 }}></Text>
          <TextInput
            value={String(editStock)}
            keyboardType={'numeric'}
            style={styles.tableInput}
            onChangeText={(text) => setEditStock(text)}
          />
          <TextInput
            value={String(editSuggestedValue)}
            keyboardType={'numeric'}
            style={styles.tableInput}
            onChangeText={(text) => setEditSuggested(text)}
          />
          <Button
            title='update'
            style={{ marginLeft: 10 }}
            onPress={() => updateValues()}
          />
        </View>
      </View>
      <Button title='Add' onPress={()=>test()}/>
    </SafeAreaView>
  );
}
