import React, { useState } from 'react';
import {
  Alert,
  Modal,
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
  TextInput,
} from 'react-native';

const EditModal = ({
  id,
  stock,
  suggested,
  resetState,
  deleteItem,
  updateData,
}) => {
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
            {deleteItem ? (
              <TouchableHighlight
                style={{
                  ...styles.openButton,
                  backgroundColor: 'rgb(220, 0, 78)',
                  marginBottom: 20,
                }}
                onPress={() => {
                  resetState();
                  deleteItem(id);
                }}
              >
                <Text style={styles.textStyle}>Delete</Text>
              </TouchableHighlight>
            ) : null}
            <Text
              style={{ fontWeight: 'bold', fontSize: 20, marginBottom: 10 }}
            >
              {id}
            </Text>
            <View style={{ flexDirection: 'row' }}>
              <View style={{ marginRight: 20 }}>
                <Text>Stock</Text>
                <TextInput
                  value={String(editStock)}
                  keyboardType={'numeric'}
                  onChangeText={(text) => setEditStock(text)}
                  style={styles.tableInput}
                />
              </View>
              <View>
                <Text>Suggested</Text>
                <TextInput
                  value={String(editSuggestedValue)}
                  keyboardType={'numeric'}
                  onChangeText={(text) => setEditSuggested(text)}
                  style={styles.tableInput}
                />
              </View>
            </View>
            <View style={{ flexDirection: 'row' }}>
              <TouchableHighlight
                style={{
                  ...styles.openButton,
                  backgroundColor: '#e0e0e0',
                  marginRight: 20,
                }}
                onPress={() => {
                  resetState();
                }}
              >
                <Text
                  style={{
                    ...styles.textStyle,
                    color: 'black',
                  }}
                >
                  Cancel
                </Text>
              </TouchableHighlight>
              <TouchableHighlight
                style={{ ...styles.openButton, backgroundColor: '#2196F3' }}
                onPress={() => {
                  updateData(id, editStock, editSuggestedValue);
                  resetState();
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
    width: '90%',
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
    borderRadius: 5,
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
