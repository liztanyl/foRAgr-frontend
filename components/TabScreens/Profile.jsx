/* eslint-disable no-unused-expressions */
import React from 'react';
import {
  VStack, Pressable, HStack,
} from 'native-base';
import { Text, View, Platform } from 'react-native';
import axios from 'axios';
import * as WebBrowser from 'expo-web-browser';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { BACKEND_URL } from '../../store.js';
import { useUserContext } from '../UserContext.jsx';
import UserProfile from '../Profile/UserProfile.jsx';

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
    <View style={{
      flex: 1, alignItems: 'center', justifyContent: 'center',
    }}
    >
      <VStack space={3} alignItems="center" style={{ width: '100%', height: '100%' }}>

        {!isEmpty(userDetails) && (
        <UserProfile userDetails={userDetails} />
        )}

        {!isEmpty(userDetails) && (
          <View>
            <Pressable
              height="40%"
              width="200px"
              borderRadius={3}
              bg="secondary.600"
              _pressed={{ bg: 'secondary.800' }}
              onPress={handleLogout}
              style={{ justifyContent: 'center', alignItems: 'center' }}
            >
              <HStack space={5} alignItems="center">
                <MaterialCommunityIcons name="logout" size={24} color="white" />
                <Text fontSize="2xl" bold color="white">Logout</Text>
              </HStack>
            </Pressable>
          </View>
        )}
      </VStack>
    </View>
  );
}
