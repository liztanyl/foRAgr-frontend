import React, { useEffect } from 'react';
import { VStack, Button } from 'native-base';
import { View, Platform } from 'react-native';
import axios from 'axios';
import { BACKEND_URL } from '../../store.js';

export default function Profile() {
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

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <VStack space={3} alignItems="center">
        <Button
          size="lg"
          padding={10}
          colorScheme="primary"
          onPress={handleLogin}
        >
          Login
        </Button>
        <Button size="lg" padding={10} colorScheme="secondary">
          Logout
        </Button>
      </VStack>
    </View>
  );
}
