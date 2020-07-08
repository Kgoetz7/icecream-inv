import React, { useState } from 'react';
import { HomeScreen } from './Screens/HomeScreen';
import { ScanScreen } from './Screens/ScanScreen';
import { InventoryScreen } from './Screens/InventoryScreen';

export default function App() {
  const [page, setPage] = useState('home');
  const [scanType, setScanType] = useState(null);

  const handleScan = async (flavor) => {
    try {
      const data = await fetch('https://icecreamapp-api.herokuapp.com/stock', {
        method: 'put',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          flavor,
          type: scanType,
        }),
      });

      const response = await data.json();
      alert(
        `${scanType === 'increment' ? 'Added' : 'Removed'} 1 ${flavor} ${
          scanType === 'increment' ? 'to' : 'from'
        } stock. ${response.updatedItem.stock} left.`
      );
    } catch (err) {
      console.log(err);
    }
  };

  if (page === 'inventory') {
    return <InventoryScreen setPage={setPage} />;
  } else if (page === 'scan') {
    return <ScanScreen setPage={setPage} handleScan={handleScan} />;
  } else {
    return <HomeScreen setPage={setPage} setScanType={setScanType} />;
  }
}
