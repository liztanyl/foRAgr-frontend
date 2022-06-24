import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { View } from 'native-base';
import { FridgeContextProvider } from './FridgeContext.jsx';
import NavbarTabs from './NavbarTabs.jsx';
import Login from './Login.jsx';

import { useUserContext } from './UserContext.jsx';

export default function Main() {
  const [loggedIn, setLoggedIn] = useState(false);
  const { userDetails, getUserDataFromAsyncStorage } = useUserContext();

  useEffect(() => {
    if (Object.keys(userDetails).length > 0) {
      setLoggedIn(true);
    } else {
      setLoggedIn(false);
      getUserDataFromAsyncStorage();
      Object.keys(userDetails).length > 0 && setLoggedIn(true);
    }
  }, [userDetails]);

  return (
    <View height="100%">
      {!loggedIn && <Login />}
      {loggedIn && (
        <FridgeContextProvider>
          <NavigationContainer>
            <NavbarTabs />
          </NavigationContainer>
        </FridgeContextProvider>
      )}
    </View>
  );
}
