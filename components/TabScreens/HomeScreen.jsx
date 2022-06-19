import React, { useState } from 'react';
import { View } from 'react-native';
import { HStack } from 'native-base';
import StorageNavButton from '../HomeScreenComponents/StorageNavButton';
import ItemDisplay from '../HomeScreenComponents/ItemDisplay';

export default function HomeScreen() {
  const STORAGE = {
    ALL: 'All',
    FRIDGE: 'Fridge',
    FREEZER: 'Freezer',
    PANTRY: 'Pantry',
  };

  const [currentStorage, setCurrentStorage] = useState(STORAGE.ALL);

  return (
    <View>
      <HStack
        mb="2.5"
        mt="1.5"
        space={2}
        mx="auto"
      >
        {Object.values(STORAGE)
          .map((value) => (
            <StorageNavButton
              storageMethod={value}
              currentStorage={currentStorage}
              setCurrentStorage={setCurrentStorage}
            />
          ))}
      </HStack>
      <ItemDisplay currentStorage={currentStorage} />
    </View>
  );
}
