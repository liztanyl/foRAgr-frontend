import React, { useState, useEffect } from 'react';
import moment from 'moment';
import { View } from 'react-native';
import { Heading } from 'native-base';

import { useFridgeContext } from '../FridgeContext.jsx';
import StorageNavigation from '../HomeScreenComponents/StorageNavigation.jsx';
import ItemDisplay from '../HomeScreenComponents/ItemDisplay.jsx';
import ExpiryAlert from '../HomeScreenComponents/ExpiryAlert.jsx';
import { STORAGE, SORT } from '../HomeScreenComponents/helpers.js';

export default function HomeScreen() {
  const [currentStorage, setCurrentStorage] = useState(STORAGE.ALL);
  const [sortBy, setSortBy] = useState(SORT.EXPIRY_ASC);
  const [numExpiringItems, setNumExpiringItems] = useState(null);
  const { fridgeItems } = useFridgeContext();

  useEffect(() => {
    if (fridgeItems) {
      const expiring = fridgeItems.filter((item) => (moment(item.expiryDate, 'DD-MM-YYYY').diff(new Date(), 'days') < 3));
      console.log(expiring);
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
      />
      <Heading px="4">{currentStorage}</Heading>
      <ItemDisplay
        currentStorage={currentStorage}
        sortBy={sortBy}
      />
    </View>
  );
}
