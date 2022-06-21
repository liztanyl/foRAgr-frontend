/* eslint-disable import/prefer-default-export */
import React, { useReducer, useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { BACKEND_URL } from '../store';

const UserContext = React.createContext();

export function useUserContext() {
  return useContext(UserContext);
}

export function UserContextProvider({ children }) {
  const [userDetails, setUserDetails] = useState({});

  useEffect(() => {
    const url = new URL(window.location.href);
    console.log(url);
    console.log(url.searchParams.get('code'));

    if (window.location.pathname === '/auth/google') {
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
