import React, { Component, useState } from 'react';
import {
  Alert,
  Modal,
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
  TextInput,
} from 'react-native';

const EditModal = ({ flavor, stock, suggested, clearFlavor, updateData }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [editSuggestedValue, setEditSuggested] = useState(suggested);
  const [editStock, setEditStock] = useState(stock);

  return (
    <View style={styles.centeredView}>
      <Modal
        animationType='slide'
        transparent={true}
        visible
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>{flavor}</Text>
            <View style={{ flexDirection: 'row' }}>
              <TextInput
                value={String(editStock)}
                keyboardType={'numeric'}
                onChangeText={(text) => setEditStock(text)}
                style={styles.tableInput}
              />
              <TextInput
                value={String(editSuggestedValue)}
                keyboardType={'numeric'}
                onChangeText={(text) => setEditSuggested(text)}
                style={styles.tableInput}
              />
            </View>
            <View style={{ flexDirection: 'row' }}>
              <TouchableHighlight
                style={{ ...styles.openButton, backgroundColor: 'red' }}
                onPress={() => {
                  clearFlavor();
                }}
              >
                <Text style={styles.textStyle}>Cancel</Text>
              </TouchableHighlight>
              <TouchableHighlight
                style={{ ...styles.openButton, backgroundColor: '#2196F3' }}
                onPress={() => {
                  updateData(flavor, editStock, editSuggestedValue);
                  clearFlavor();
                }}
              >
                <Text style={styles.textStyle}>Update</Text>
              </TouchableHighlight>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  openButton: {
    backgroundColor: '#F194FF',
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
  tableInput: {
    borderColor: 'black',
    borderWidth: 1,
    textAlign: 'center',
    marginRight: 5,
    marginBottom: 10,
    padding: 5,
  },
});

export default EditModal;
