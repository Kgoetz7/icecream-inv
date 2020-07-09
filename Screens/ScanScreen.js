import React, { useState } from 'react';
import { SafeAreaView, StatusBar } from 'react-native';
import BarcodeScanner from '../BarcodeScanner';

export const ScanScreen = ({ navigation, handleScan }) => {
  return (
    <>
      <SafeAreaView>
        <StatusBar />
      </SafeAreaView>
      <BarcodeScanner
        closeFn={() => navigation.navigate('Home')}
        onScan={(barcodeData) => {
          handleScan(barcodeData);
        }}
      />
    </>
  );
};
