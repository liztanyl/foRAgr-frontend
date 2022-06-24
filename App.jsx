import React from 'react';
import axios from 'axios';
import * as Notifications from 'expo-notifications';
import { NativeBaseProvider, extendTheme } from 'native-base';
import { UserContextProvider } from './components/UserContext.jsx';
import Main from './components/Main.jsx';
import getTheme from './components/styles/theme.jsx';

console.disableYellowBox = true;
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
    <NativeBaseProvider theme={newTheme}>
      <UserContextProvider>
        <Main />
      </UserContextProvider>
    </NativeBaseProvider>
  );
}
