import React, { useState } from 'react';
import { View } from 'react-native';
import { Heading } from 'native-base';
import StorageNavigation from '../HomeScreenComponents/StorageNavigation';
import ItemDisplay from '../HomeScreenComponents/ItemDisplay';
import { STORAGE, SORT } from '../HomeScreenComponents/helpers';

export default function HomeScreen() {
  const [currentStorage, setCurrentStorage] = useState(STORAGE.ALL);
  const [sortBy, setSortBy] = useState(SORT.EXPIRY_ASC);

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
