import React, { useEffect } from 'react';
import { VStack, Button } from 'native-base';
import { View, Platform } from 'react-native';
import axios from 'axios';
import { BACKEND_URL } from '../../store.js';
import { useUserContext } from '../UserContext.jsx';

export default function Profile() {
  const { userDetails, setUserDetails } = useUserContext();

  function isEmpty(obj) {
    return Object.keys(obj).length === 0;
  }

  const handleLogin = () => {
    console.log('logging in');
    if (Platform.OS === 'web') {
      axios
        .get(`${BACKEND_URL}/user/getGoogleAuthUrl`)
        .then((response) => {
          console.log(response.data);
          const redirectURI = response.data;
          window.location.href = redirectURI;
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  const handleLogout = () => {
    console.log('logging out');
    if (Platform.OS === 'web') {
      axios
        .post(`${BACKEND_URL}/user/logout`)
        .then((response) => {
          console.log(response.data);
          setUserDetails({});
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <VStack space={3} alignItems="center">
        {isEmpty(userDetails) && (
          <Button
            size="lg"
            padding={10}
            colorScheme="primary"
            onPress={handleLogin}
          >
            Login
          </Button>
        )}
        {!isEmpty(userDetails) && (
          <Button
            size="lg"
            padding={10}
            colorScheme="secondary"
            onPress={handleLogout}
          >
            Logout
          </Button>
        )}
      </VStack>
    </View>
  );
}
