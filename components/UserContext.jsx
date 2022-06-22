/* eslint-disable react/jsx-no-constructed-context-values */
/* eslint-disable import/prefer-default-export */
import React, { useReducer, useContext, useEffect, useState } from 'react';
import { Platform } from 'react-native';
import axios from 'axios';
import Cookies from 'js-cookie';

import { BACKEND_URL } from '../store';

const UserContext = React.createContext();

export function useUserContext() {
  return useContext(UserContext);
}

export function UserContextProvider({ children }) {
  const [userDetails, setUserDetails] = useState({});

  const userDataFromCookies = () => JSON.parse(Cookies.get('logged_in_user'));

  useEffect(() => {
    if (Platform.OS === 'web' && window.location.pathname === '/auth/google') {
      const url = new URL(window.location.href);
      console.log(url);
      console.log(url.searchParams.get('code'));

      const authCode = url.searchParams.get('code');
      const dataToServer = {
        authCode,
      };

      axios
        .post(`${BACKEND_URL}/user/getAccessToken`, dataToServer)
        .then(() => {
          console.log('logged in');
          setUserDetails(userDataFromCookies());
        })
        .catch((err) => {
          console.log(err);
        });
    }

    if (Cookies.get('logged_in_user') && Cookies.get('token')) {
      setUserDetails(userDataFromCookies());
    }
  }, []);

  return (
    <UserContext.Provider
      value={{
        userDetails,
        setUserDetails,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}
