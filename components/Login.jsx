/* eslint-disable no-unused-expressions */
import React, { useEffect, useState } from 'react';
import { VStack, Button } from 'native-base';
import { Text, View, Platform } from 'react-native';
import axios from 'axios';
import * as Google from 'expo-auth-session/providers/google';
import * as WebBrowser from 'expo-web-browser';

import { BACKEND_URL } from '../store.js';
import { useUserContext } from './UserContext.jsx';
import { oAuthExpoClientId } from '../secret.js';

Platform.OS !== 'web' && WebBrowser.maybeCompleteAuthSession();

export default function Login() {
  const { userDetails, userLoginSet } = useUserContext();
  const [accessToken, setAccessToken] = useState();
  const [request, response, promptAsync] = Google.useAuthRequest({
    expoClientId: oAuthExpoClientId,
    webClientId: oAuthExpoClientId,
  });

  /**
   * completes the user login procedure on mobile
   */
  const getUserDataMobile = async () => {
    const userInfoResponse = await fetch(
      'https://www.googleapis.com/userinfo/v2/me',
      {
        headers: { Authorization: `Bearer ${accessToken}` },
      }
    );

    userInfoResponse.json().then((googleResponseData) => {
      axios
        .post(`${BACKEND_URL}/user/loginMobile`, googleResponseData)
        .then((res) => {
          const { userData, token, newUser } = res.data;
          userLoginSet(userData, token);

          if (newUser) {
            console.log('New user registered');
            // account created message snackbar
          }
        })
        .catch((err) => {
          console.log(err);
        });
    });
  };

  useEffect(() => {
    // CHECKS FOR THE RESPONSE WHICH IS CALLED FROM promptAsync
    if (response?.type === 'success') {
      setAccessToken(response.authentication.accessToken);
    }
  }, [response]);

  useEffect(() => {
    if (accessToken) {
      getUserDataMobile();
    }
  }, [accessToken]);

  function isEmpty(obj) {
    return Object.keys(obj).length === 0;
  }

  const handleLogin = () => {
    if (Platform.OS === 'web') {
      axios
        .get(`${BACKEND_URL}/user/getGoogleAuthUrl`)
        .then((res) => {
          const redirectURI = res.data;
          window.location.href = redirectURI;
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      accessToken ? getUserDataMobile() : promptAsync({ useProxy: true });
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
            Login with Google
          </Button>
        )}
        {!isEmpty(userDetails) && (
          <Text>You are logged into: {userDetails.email}</Text>
        )}
      </VStack>
    </View>
  );
}
