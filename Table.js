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
      tableData: {
        '1': {
          flavor: 'Chocolate',
          stock: '11',
          suggested: '31',
          btn: true,
        },
        '2': { flavor: 'Vanilla', stock: '5', suggested: '11', btn: true },
        '3': {
          flavor: 'Strawberry',
          stock: '8',
          suggested: '15',
          btn: true,
        },
      },
      selectedFlavor: null,
      addInProgress: false,
      scanned: false,
      selectedId: null,
    };
    this.resetState = this.resetState.bind(this);
    this.updateData = this.updateData.bind(this);
  }

  async updateData(flavor, stock, suggested) {
    try {
      const data = await fetch('http://localhost:5000/items', {
        method: 'put',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          flavor: 'Vanilla',
          stock: 1,
          suggested: 2,
        }),
      });

      console.log(data);
      const items = await data.json();
    } catch (err) {
      console.log(err);
    }

    let tableDataCopy = this.state.tableData;
    tableDataCopy[flavor] = { flavor, stock, suggested, btn: true };

    this.setState({
      ...this.state,
      tableData: tableDataCopy,
    });
  }

  resetState() {
    this.setState({
      ...this.state,
      selectedFlavor: null,
      selectedId: null,
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
          updateData={this.updateData}
          id={state.selectedId}
        />
      );
    }
    if (state.addInProgress) {
      return (
        <BarcodeScanner
          closeFn={() => this.setState({ ...state, addInProgress: false })}
          onScan={(barcode) => {
            this.setState({
              ...this.state,
              scanned: true,
              selectedId: barcode,
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
          {Object.keys(state.tableData).map((key, index) => (
            <TableWrapper style={styles.row} key={index}>
              {Object.keys(state.tableData[key]).map((innerKey, index) => {
                return (
                  <Fragment key={index}>
                    <Cell
                      key={index}
                      data={
                        innerKey === 'btn'
                          ? element(state.tableData[key]['flavor'], index)
                          : state.tableData[key][innerKey]
                      }
                      textStyle={styles.text}
                    />
                    {state.selectedFlavor === state.tableData[key]['flavor'] ? (
                      <EditModal
                        flavor={state.tableData[key]['flavor']}
                        resetState={this.resetState}
                        stock={state.tableData[key]['stock']}
                        suggested={state.tableData[key]['suggested']}
                        updateData={this.updateData}
                        id={key}
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
