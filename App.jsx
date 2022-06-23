import React from 'react';
import axios from 'axios';
import { NavigationContainer } from '@react-navigation/native';
import { NativeBaseProvider, extendTheme } from 'native-base';
import * as Notifications from 'expo-notifications';
import { FridgeContextProvider } from './components/FridgeContext.jsx';
import { UserContextProvider } from './components/UserContext.jsx';
import getTheme from './components/styles/theme.jsx';

import NavbarTabs from './components/NavbarTabs.jsx';

axios.defaults.withCredentials = true;

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

export default function App() {
  const newTheme = extendTheme(getTheme());

  return (
    <UserContextProvider>
      <FridgeContextProvider>
        <NativeBaseProvider theme={newTheme}>
          <NavigationContainer>
            <NavbarTabs />
          </NavigationContainer>
        </NativeBaseProvider>
      </FridgeContextProvider>
    </UserContextProvider>
  );
}
