import React, { Component, Fragment } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Button } from 'react-native';
import { Table, TableWrapper, Row, Cell } from 'react-native-table-component';
import EditModal from './EditModal';
import BarcodeScanner from './BarcodeScanner';

export default class InventoryTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tableHead: ['Flavor', 'Stock', 'Suggested', ''],
      selectedFlavor: null,
      addInProgress: false,
      scanned: false,
    };
    this.resetState = this.resetState.bind(this);
  }

  resetState() {
    this.setState({
      ...this.state,
      selectedFlavor: null,
      addInProgress: false,
      scanned: false,
    });
  }

  _setSelectedFlavor(data) {
    this.setState({ ...this.state, selectedFlavor: data });
  }

  render() {
    const state = this.state;
    const element = (data, index) => (
      <TouchableOpacity onPress={() => this._setSelectedFlavor(data)}>
        <View style={styles.btn}>
          <Text style={styles.btnText}>Edit</Text>
        </View>
      </TouchableOpacity>
    );

    if (state.addInProgress && state.scanned) {
      return (
        <EditModal
          resetState={this.resetState}
          stock={''}
          suggested={''}
          updateData={this.props.addData}
          id={state.selectedFlavor}
        />
      );
    }
    if (state.addInProgress) {
      return (
        <BarcodeScanner
          closeFn={() => this.setState({ ...state, addInProgress: false })}
          onScan={(barcodeData) => {
            this.setState({
              ...this.state,
              scanned: true,
              selectedFlavor: barcodeData,
            });
          }}
        />
      );
    }

    return (
      <View style={styles.container}>
        <Table borderStyle={{ borderColor: 'transparent' }}>
          <Row
            data={state.tableHead}
            style={styles.head}
            textStyle={styles.text}
          />
          {this.props.data.map((object, index) => (
            <TableWrapper style={styles.row} key={index}>
              {Object.keys(object).map((key, index) => {
                return (
                  <Fragment key={index}>
                    <Cell
                      key={index}
                      data={
                        key === 'btn'
                          ? element(object['flavor'], index)
                          : object[key]
                      }
                      textStyle={styles.text}
                    />
                    {state.selectedFlavor === object['flavor'] ? (
                      <EditModal
                        flavor={object['flavor']}
                        resetState={this.resetState}
                        stock={object['stock']}
                        suggested={object['suggested']}
                        updateData={this.props.updateData}
                        id={object['flavor']}
                      />
                    ) : null}
                  </Fragment>
                );
              })}
            </TableWrapper>
          ))}
        </Table>
        <Button
          title='Add'
          onPress={() => this.setState({ ...state, addInProgress: true })}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, paddingTop: 30, backgroundColor: '#fff' },
  head: { height: 40, backgroundColor: '#808B97' },
  text: { margin: 6 },
  row: { flexDirection: 'row', backgroundColor: '#FFF1C1' },
  btn: { width: 58, height: 18, backgroundColor: '#78B7BB', borderRadius: 2 },
  btnText: { textAlign: 'center', color: '#fff' },
});
