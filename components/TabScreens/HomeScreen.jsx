import React, { useState, useEffect } from 'react';
import moment from 'moment';
import { View } from 'react-native';
import { Center, Heading, Text } from 'native-base';
import { useFridgeContext } from '../FridgeContext.jsx';
import StorageNavigation from '../HomeScreenComponents/StorageNavigation.jsx';
import ItemDisplay from '../HomeScreenComponents/ItemDisplay.jsx';
import ExpiryAlert from '../HomeScreenComponents/ExpiryAlert.jsx';
import { STORAGE, SORT } from '../HomeScreenComponents/helpers.js';
import allowsNotificationsAsync from '../NotificationComponent/allowsNotificationsAsync.js';

export default function HomeScreen() {
  const [currentStorage, setCurrentStorage] = useState(STORAGE.ALL);
  const [sortBy, setSortBy] = useState(SORT.EXPIRY_ASC);
  const [numExpiringItems, setNumExpiringItems] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const { fridgeItems } = useFridgeContext();

  allowsNotificationsAsync();
  useEffect(() => {
    if (fridgeItems && fridgeItems.length > 0) {
      const expiring = fridgeItems?.filter((item) => (moment(item.expiryDate).diff(new Date(), 'days') < 4));
      if (expiring.length > 0) setNumExpiringItems(expiring.length);
      else setNumExpiringItems(null);
    }
  }, [fridgeItems]);

  return (
    <View style={{ height: '100%' }}>
      {numExpiringItems && <ExpiryAlert num={numExpiringItems} />}
      <StorageNavigation
        currentStorage={currentStorage}
        setCurrentStorage={setCurrentStorage}
        sortBy={sortBy}
        setSortBy={setSortBy}
        setIsLoading={setIsLoading}
      />
      <Heading px="4" fontWeight="700" fontSize="2xl">{currentStorage}</Heading>
      {(!fridgeItems || (fridgeItems.length === 0))
      && (
      <Center flex={1} alignItems="center" justifyContent="center">
        <Text>There's nothing here! Add some items first.</Text>
      </Center>
      )}
      {fridgeItems
        && (
        <ItemDisplay
          currentStorage={currentStorage}
          sortBy={sortBy}
          isLoading={isLoading}
          setIsLoading={setIsLoading}
        />
        )}
    </View>
  );
}
