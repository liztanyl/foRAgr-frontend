/* eslint-disable react/jsx-no-constructed-context-values */
/* eslint-disable import/prefer-default-export */
import React, { useContext, useEffect, useState } from 'react';
import { Platform } from 'react-native';
import axios from 'axios';
import Cookies from 'js-cookie';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { BACKEND_URL } from '../store.js';

const USER_TOKEN = 'userToken';
const USER_DETAILS = 'userDetails';
const UserContext = React.createContext();

export function useUserContext() {
  return useContext(UserContext);
}

export function UserContextProvider({ children }) {
  const [userDetails, setUserDetails] = useState({});
  const [jwtToken, setJwtToken] = useState();
  const userDataFromCookies = () => JSON.parse(Cookies.get('logged_in_user'));

  const userLoginSet = (userDetails, token) => {
    setUserDetails(userDetails);
    AsyncStorage.setItem(USER_DETAILS, JSON.stringify(userDetails));

    setJwtToken(token);
    AsyncStorage.setItem(USER_TOKEN, token);
  };

  const removeUserDetails = () => {
    setJwtToken();
    setUserDetails({});
    AsyncStorage.removeItem(USER_TOKEN);
    AsyncStorage.removeItem(USER_DETAILS);
  };

  const getUserDataFromAsyncStorage = () => {
    AsyncStorage.getItem(USER_TOKEN, (err, result) => {
      if (err) console.log(err);
      if (result) {
        console.log('user token found in async storage');
        setJwtToken(result);
      } else {
        console.log('NO USER TOKEN FOUND');
      }
    });

    AsyncStorage.getItem(USER_DETAILS, (err, result) => {
      if (err) console.log(err);
      if (result) {
        console.log('user details found in async storage');
        setUserDetails(JSON.parse(result));
      } else {
        console.log('NO USER DETAILS FOUND');
      }
    });
  };

  useEffect(() => {
    if (Platform.OS === 'web' && window.location.pathname === '/auth/google') {
      const url = new URL(window.location.href);
      const authCode = url.searchParams.get('code');
      const dataToServer = {
        authCode,
      };

      axios
        .post(`${BACKEND_URL}/user/getAccessToken`, dataToServer)
        .then(() => {
          setUserDetails(userDataFromCookies());
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, []);

  return (
    <UserContext.Provider
      value={{
        userDetails,
        setUserDetails,
        jwtToken,
        setJwtToken,
        userLoginSet,
        removeUserDetails,
        getUserDataFromAsyncStorage,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}
