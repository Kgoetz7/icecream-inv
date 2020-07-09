import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import { HomeScreen } from './Screens/HomeScreen';
import { ScanScreen } from './Screens/ScanScreen';
import { InventoryScreen } from './Screens/InventoryScreen';

const Stack = createStackNavigator();

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
      alert('Item not found');
      console.log(err);
    }
  };

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name='Home'>
          {(props) => <HomeScreen {...props} setScanType={setScanType} />}
        </Stack.Screen>
        <Stack.Screen name='Inventory' component={InventoryScreen} />
        <Stack.Screen name='Scan'>
          {(props) => <ScanScreen {...props} handleScan={handleScan} />}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );

  if (page === 'inventory') {
    return <InventoryScreen setPage={setPage} />;
  } else if (page === 'scan') {
    return <ScanScreen setPage={setPage} handleScan={handleScan} />;
  } else {
    return <HomeScreen setPage={setPage} setScanType={setScanType} />;
  }
}
