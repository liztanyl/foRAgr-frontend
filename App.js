import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { NativeBaseProvider } from 'native-base';
import { FridgeContextProvider } from './components/FridgeContext.jsx';

import NavbarTabs from './components/NavbarTabs.js';

export default function App() {
  return (
    <FridgeContextProvider>
      <NativeBaseProvider>
        <NavigationContainer>
          <NavbarTabs />
        </NavigationContainer>
      </NativeBaseProvider>
    </FridgeContextProvider>
  );
}
