import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Heading } from 'native-base';
import ReceiptMainScreen from '../Receipts/ReceiptMainScreen.jsx';
import CameraScreen from '../Receipts/CameraScreen.jsx';
import ManualEntry from '../Receipts/ManualEntry.jsx';
import ParsedReceipt from '../Receipts/ParsedReceipt.jsx';
import ItemReview from '../Receipts/ItemReview.jsx';
import NoData from '../Receipts/NoData.jsx';

function Header(title) {
  return <Heading>{title}</Heading>;
}
function Subheader(title) {
  return <Heading size="md">{title}</Heading>;
}

export default function EnterReceipt() {
  const Stack = createNativeStackNavigator();

  return (
    <Stack.Navigator
      initialRouteName="Choose Mode"
      screenOptions={{
        animation: 'slide_from_right',
      }}
    >
      <Stack.Screen
        name="Choose Mode"
        component={ReceiptMainScreen}
        options={{
          headerTitle: () => Header('Choose Mode'),
        }}
      />
      <Stack.Screen
        name="Camera Mode"
        component={CameraScreen}
        options={{
          headerTitle: () => Header('Camera Mode'),
        }}
      />
      <Stack.Screen
        name="No data"
        component={NoData}
        options={{
          headerTitle: () => Subheader('No Items Detected'),
          headerBackVisible: false,
        }}
      />
      <Stack.Screen
        name="See Parsed Receipt"
        component={ParsedReceipt}
        options={{
          headerTitle: () => Subheader('Possible Items Detected'),
          headerBackVisible: false,
        }}
      />
      <Stack.Screen
        name="Manual Entry"
        component={ManualEntry}
        options={{
          headerTitle: () => Header('Manual Entry'),
        }}
      />
      <Stack.Screen
        name="Review Items"
        component={ItemReview}
        options={{
          headerTitle: () => Header('Review Items'),
          headerBackVisible: false,
        }}
      />
    </Stack.Navigator>
  );
}
