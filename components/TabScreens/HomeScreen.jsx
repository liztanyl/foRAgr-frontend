import React, { useState } from 'react';
import { View } from 'react-native';
import { Heading } from 'native-base';
import StorageNavigation from '../HomeScreenComponents/StorageNavigation.jsx';
import ItemDisplay from '../HomeScreenComponents/ItemDisplay.jsx';
import { STORAGE, SORT } from '../HomeScreenComponents/helpers.js';
import allowsNotificationsAsync from '../NotificationComponent/allowsNotificationsAsync.js';

export default function HomeScreen() {
  const [currentStorage, setCurrentStorage] = useState(STORAGE.ALL);
  const [sortBy, setSortBy] = useState(SORT.EXPIRY_ASC);
  allowsNotificationsAsync();
  return (
    <View style={{ height: '100%' }}>
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
