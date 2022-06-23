import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { View } from 'native-base';
import { FridgeContextProvider } from './FridgeContext.jsx';
import NavbarTabs from './NavbarTabs.jsx';

import { useUserContext } from './UserContext.jsx';

export default function Main() {
  const [loggedIn, setLoggedIn] = useState(false);
  const { userDetails } = useUserContext();

  useEffect(() => {
    Object.keys(userDetails).length > 0
      ? setLoggedIn(true)
      : setLoggedIn(false);
  }, [userDetails]);

  return (
    <View height="100%">
      {/* {!loggedIn && <Login />} */}
      {/* {loggedIn && */}
      <FridgeContextProvider>
        <NavigationContainer>
          <NavbarTabs />
        </NavigationContainer>
      </FridgeContextProvider>
      {/* } */}
    </View>
  );
}
