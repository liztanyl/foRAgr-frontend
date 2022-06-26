/* eslint-disable no-unused-expressions */
import React from 'react';
import {
  VStack, Button, Box, Text, Avatar, HStack, Icon, Pressable,
} from 'native-base';
import {
  View, Platform, StyleSheet, Image,
} from 'react-native';
import { MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';

import axios from 'axios';
import moment from 'moment';
import * as WebBrowser from 'expo-web-browser';
import { BACKEND_URL } from '../../store.js';
import { useUserContext } from '../UserContext.jsx';
import profile from '../../assets/profile1.png';

WebBrowser.maybeCompleteAuthSession();
const styles = StyleSheet.create({
  profileContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 100,
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
    marginTop: 20,
  },
  profile: {
    imageRendering: '-webkit-optimize-contrast',
  },

});

export default function Profile() {
  const { userDetails, removeUserDetails } = useUserContext();
  const {
    email, name, picture, createdAt,
  } = userDetails;

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
      {!isEmpty(userDetails) && (
      <View>
        <Box mx="auto" style={styles.profileContainer}>
          {picture ? (
            <Avatar
              size="xl"
              source={{
                uri: picture,
              }}
              style={styles.profile}
              marginBottom={3}
            />
          )
            : <Image source={profile} style={styles.profile} />}
        </Box>

        <VStack space={3} alignItems="center">
          <VStack alignItems="center" space={0}>
            <Text fontSize="xl" bold>{name}</Text>
            <Text fontSize="lg">{email}</Text>
            <Text fontSize="lg" italic>
              FoRAg'ing since
              {' '}
              {moment(createdAt).format('D MMMM YYYY')}
            </Text>
          </VStack>

          <Button
            size="sm"
            p={5}
            bg="secondary.600"
            _pressed={{ bg: 'secondary.800' }}
            onPress={handleLogout}
            style={styles.buttonLogout}
          >
            <HStack space={5} alignItems="center">
              <Text fontSize="xl" color="white">Logout</Text>
              <Icon as={MaterialCommunityIcons} name="logout" size="lg" color="white" />
            </HStack>
          </Button>

        </VStack>
      </View>
      )}
    </View>
  );
}
