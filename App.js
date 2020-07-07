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

export default function App() {
  const [editMode, setEditMode] = useState(false);
  const [stock, setStock] = useState(5);
  const [suggested, setSuggested] = useState(10);
  const [editSuggestedValue, setEditSuggested] = useState(10);
  const [editStock, setEditStock] = useState(5);

  const updateValues = () => {
    setStock(editStock);
    setSuggested(editSuggestedValue);
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style='auto' />
      <View
        style={{
          flexDirection: 'row',
          width: '100%',
          justifyContent: 'space-evenly',
        }}
      >
        <Text style={{ minWidth: 100 }}>Flavor</Text>
        <Text>Stock</Text>
        <Text>Suggested</Text>
        <Text></Text>
      </View>
      <View
        style={{
          flexDirection: 'row',
          padding: 10,
          backgroundColor: 'red',
          width: '100%',
          justifyContent: 'space-evenly',
          fontSize: 40,
        }}
      >
        <Text style={{ padding: 5 }}>IceCreamName</Text>
        <Text
          style={{
            textAlign: 'center',
            marginRight: 5,
            fontSize: 20,
          }}
        >
          {stock}
        </Text>
        <Text
          style={{
            textAlign: 'center',
            marginRight: 5,
            fontSize: 20,
          }}
        >
          {suggested}
        </Text>
        <Button
          title='edit'
          style={{ marginLeft: 10 }}
          onPress={() => setEditMode(!editMode)}
        />
      </View>
      <View
        style={{
          flexDirection: 'row',
          padding: 10,
          backgroundColor: 'red',
          width: '100%',
          justifyContent: 'space-evenly',
          fontSize: 40,
          display: editMode ? 'flex' : `none`,
        }}
      >
        <Text style={{ padding: 5, minWidth: 100 }}></Text>
        <TextInput
          value={String(editStock)}
          style={{
            borderColor: 'black',
            borderWidth: 1,
            textAlign: 'center',
            marginRight: 5,
          }}
          onChangeText={(text) => setEditStock(text)}
        />
        <TextInput
          value={String(editSuggestedValue)}
          style={{
            borderColor: 'black',
            borderWidth: 1,
            textAlign: 'center',
            marginRight: 5,
          }}
          onChangeText={(text) => setEditSuggested(text)}
        />
        <Button
          title='update'
          style={{ marginLeft: 10 }}
          onPress={() => updateValues()}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
});
