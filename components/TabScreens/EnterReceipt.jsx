import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ReceiptMainScreen from '../Receipts/ReceiptMainScreen.jsx';
import CameraScreen from '../Receipts/CameraScreen.jsx';
import ManualEntry from '../Receipts/ManualEntry.jsx';
import ParsedReceipt from '../Receipts/ParsedReceipt.jsx';
import ReviewItems from '../Receipts/ReviewItems.jsx';
import ItemReview from '../Receipts/ItemReview.jsx';

export default function EnterReceipt() {
  const Stack = createNativeStackNavigator();

  return (
    <Stack.Navigator initialRouteName="Choose Mode">
      <Stack.Screen name="Choose Mode" component={ReceiptMainScreen} />
      <Stack.Screen name="Camera Mode" component={CameraScreen} />
      <Stack.Screen name="See Parsed Receipt" component={ParsedReceipt} />
      <Stack.Screen name="Manual Entry" component={ManualEntry} />
      <Stack.Screen name="Review Items" component={ItemReview} />
    </Stack.Navigator>
  );
}
