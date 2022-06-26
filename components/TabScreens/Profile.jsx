/* eslint-disable no-unused-expressions */
import React from 'react';
import {
  VStack, Button, Box, Text, Avatar, Icon,
} from 'native-base';
import {
  View, Platform, StyleSheet, Image,
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

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
        <VStack space={3} alignItems="center">
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

          <VStack alignItems="center" space={0}>
            <Text fontSize="xl" bold>{name}</Text>
            <Text fontSize="lg">{email}</Text>
            <Text fontSize="md">
              {'foRAg\'ing since '}
              {moment(createdAt).format('D MMMM YYYY')}
            </Text>
          </VStack>

          <Button
            p={3}
            paddingLeft={5}
            paddingRight={5}
            m={10}
            _text={{ fontSize: 'xl' }}
            colorScheme="secondary"
            onPress={handleLogout}
            endIcon={<Icon as={MaterialIcons} name="logout" size="md" color="white" marginLeft={1} />}
          >
            Logout
          </Button>

        </VStack>
      )}
    </View>
  );
}
