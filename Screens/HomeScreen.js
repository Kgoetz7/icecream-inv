import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableHighlight,
  StatusBar,
} from 'react-native';

export const HomeScreen = ({ setScanType, navigation }) => {
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
            setScanType('increment');
            navigation.navigate('Scan');
          }}
        >
          <Text style={styles.btnText}>Scan In</Text>
        </TouchableHighlight>
        <Text>{'           '}</Text>
        <TouchableHighlight
          style={styles.homeBtn}
          onPress={() => {
            setScanType('decrement');
            navigation.navigate('Scan');
          }}
        >
          <Text style={styles.btnText}>Scan Out</Text>
        </TouchableHighlight>
        <Text>{'           '}</Text>
        <TouchableHighlight
          style={styles.homeBtn}
          onPress={() => navigation.navigate('Inventory')}
        >
          <Text style={styles.btnText}>View Inventory</Text>
        </TouchableHighlight>
      </View>
    </SafeAreaView>
  );
};

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
