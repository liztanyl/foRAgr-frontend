/* eslint-disable no-unused-expressions */
import React from 'react';
import {
  VStack, Button, Box, Text,
} from 'native-base';
import {
  View, Platform, StyleSheet, Image,
} from 'react-native';
import axios from 'axios';
import * as WebBrowser from 'expo-web-browser';
import { BACKEND_URL } from '../../store.js';
import { useUserContext } from '../UserContext.jsx';
import UserProfile from '../Profile/UserProfile.jsx';
import profile from '../../assets/profile1.png';

WebBrowser.maybeCompleteAuthSession();
const styles = StyleSheet.create({
  profileContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 60,
  },
  imgbg: {
    justifyContent: 'center',
    alignContent: 'center',
  },
  profileText: {
    fontSize: 18,
    textAlign: 'center',
    marginTop: 10,
    padding: 15,
    borderRadius: 15,
  },
  buttonLogout: {
    backgroundColor: '#715433',

  },
  profile: {
    imageRendering: '-webkit-optimize-contrast',
  },

});

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
    <View styles={styles.imgbg}>
      <Box mx="auto" style={styles.profileContainer}>
        <Image source={profile} style={styles.profile} />
      </Box>
      <VStack space={3} alignItems="center">
        {!isEmpty(userDetails) && (
          <Text style={styles.profileText}>
            You are logged into:
            {' '}
            {userDetails.email}
          </Text>
        )}

        {!isEmpty(userDetails) && (
          <Button
            size="lg"
            colorScheme="secondary"
            onPress={handleLogout}
            style={styles.buttonLogout}
          >
            Logout
          </Button>
        )}
      </VStack>
    </View>
  );
}
