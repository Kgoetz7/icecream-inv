import React from 'react';
import { SafeAreaView, StatusBar } from 'react-native';
import BarcodeScanner from '../BarcodeScanner';

export const ScanScreen = ({ setPage, handleScan }) => {
  return (
    <>
      <SafeAreaView>
        <StatusBar />
      </SafeAreaView>
      <BarcodeScanner
        closeFn={() => setPage('home')}
        onScan={(barcodeData) => {
          handleScan(barcodeData);
        }}
      />
    </>
  );
};
