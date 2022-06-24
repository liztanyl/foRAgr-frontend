/* eslint-disable no-unused-expressions */
import React from 'react';
import { VStack, Button } from 'native-base';
import { Text, View, Platform } from 'react-native';
import axios from 'axios';
import * as WebBrowser from 'expo-web-browser';
import { BACKEND_URL } from '../../store.js';
import { useUserContext } from '../UserContext.jsx';

WebBrowser.maybeCompleteAuthSession();

export default function Profile() {
  const { userDetails, removeUserDetails } = useUserContext();

  function isEmpty(obj) {
    return Object.keys(obj).length === 0;
  }

  const handleLogout = () => {
    console.log('logging out');
    if (Platform.OS === 'web') {
      axios
        .post(`${BACKEND_URL}/user/logout`)
        .then((res) => {
          console.log(res.data);
          removeUserDetails();
          // SUCCESSFUL LOGOUT WEB
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      // MOBILE LOGOUT
      removeUserDetails();
      // SUCCESSFUL LOGOUT WEB
    }
  };

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <VStack space={3} alignItems="center">
        {!isEmpty(userDetails) && (
          <Text>You are logged into: {userDetails.email}</Text>
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
