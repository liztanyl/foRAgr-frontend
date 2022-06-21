/* eslint-disable import/prefer-default-export */
import React, {
  useReducer, useContext, useEffect, useState,
} from 'react';
import { Platform } from 'react-native';

import axios from 'axios';
import { BACKEND_URL } from '../store';

const UserContext = React.createContext();

export function useUserContext() {
  return useContext(UserContext);
}

export function UserContextProvider({ children }) {
  const [userDetails, setUserDetails] = useState({});

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
        .then((response) => {
          console.log(response.data);
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
      }}
    >
      {children}
    </UserContext.Provider>
  );
}
