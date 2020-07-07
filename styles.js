import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  homeBtnContainer: {
    marginBottom: 20,
    marginTop: 10,
    marginLeft: 10,
    alignSelf: 'flex-start',
  },
  tableHeader: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-evenly',
  },
  tableData: {
    flexDirection: 'row',
    padding: 10,
    width: '100%',
    justifyContent: 'space-evenly',
    fontSize: 40,
  },
  tableCell: {
    textAlign: 'center',
    marginRight: 5,
    fontSize: 20,
  },
  tableInput: {
    borderColor: 'black',
    borderWidth: 1,
    textAlign: 'center',
    marginRight: 5,
    padding: 5,
  },
});

export default styles;
