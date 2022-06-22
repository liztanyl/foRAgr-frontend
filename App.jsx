import React from 'react';
import axios from 'axios';
import { NavigationContainer } from '@react-navigation/native';
import { NativeBaseProvider } from 'native-base';
import { FridgeContextProvider } from './components/FridgeContext.jsx';
import { UserContextProvider } from './components/UserContext.jsx';

import NavbarTabs from './components/NavbarTabs.js';

axios.defaults.withCredentials = true;

export default function App() {
  return (
    <UserContextProvider>
      <FridgeContextProvider>
        <NativeBaseProvider>
          <NavigationContainer>
            <NavbarTabs />
          </NavigationContainer>
        </NativeBaseProvider>
      </FridgeContextProvider>
    </UserContextProvider>
  );
}
