/* eslint-disable no-unused-expressions */
import React, { useEffect, useState } from 'react';
import { VStack, Button } from 'native-base';
import { Text, View, Platform } from 'react-native';
import axios from 'axios';
import * as Google from 'expo-auth-session/providers/google';
import * as WebBrowser from 'expo-web-browser';
import { BACKEND_URL } from '../../store.js';
import { useUserContext } from '../UserContext.jsx';
import { oAuthExpoClientId } from '../../secret.js';

WebBrowser.maybeCompleteAuthSession();

export default function Profile() {
  const { userDetails, setUserDetails } = useUserContext();
  const [accessToken, setAccessToken] = useState();
  const [request, response, promptAsync] = Google.useAuthRequest({
    expoClientId: oAuthExpoClientId,
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
      console.log(googleResponseData);

      axios
        .post(`${BACKEND_URL}/user/loginMobile`, googleResponseData)
        .then((res) => {
          console.log(res.data.userData);
          setUserDetails(res.data.userData);
          if (res.data.newUser) {
            console.log('New user registered');
            // account created message snackbar
          }
          console.log('mobile login complete');
        })
        .catch((err) => {
          console.log(err);
        });
    });
  };

  useEffect(() => {
    console.log('checking for response update');
    // CHECKS FOR THE RESPONSE WHICH IS CALLED FROM promptAsync
    if (response?.type === 'success') {
      console.log('response success');
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
        .post(`${BACKEND_URL}/user/getGoogleAuthUrl`)
        .then((res) => {
          console.log(res.data);
          const redirectURI = res.data;
          window.location.href = redirectURI;
        })
        .catch((err) => {
          console.log(err);
        });
    } else if (Platform.OS === 'ios') {
      console.log('logging in mobile');
      accessToken ? getUserDataMobile() : promptAsync({ useProxy: true });
    }
  };

  const handleLogout = () => {
    console.log('logging out');
    if (Platform.OS === 'web') {
      axios
        .post(`${BACKEND_URL}/user/logout`)
        .then((res) => {
          console.log(res.data);
          setUserDetails({});
          // SUCCESSFUL LOGOUT WEB
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      setAccessToken();
      setUserDetails({});
      // SUCCESSFUL LOGOUT WEB
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
