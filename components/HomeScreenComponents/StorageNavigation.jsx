/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/no-unstable-nested-components */
import React from 'react';
import {
  VStack, HStack, Button, Text, Menu,
} from 'native-base';
import { STORAGE, SORT } from './helpers';

export default function StorageNavigation({
  currentStorage, setCurrentStorage, sortBy, setSortBy,
}) {
  function StorageButtons() {
    return (
      <HStack
        space={2}
        mx="auto"
      >
        {Object.values(STORAGE)
          .map((value) => (
            <Button
              key={value}
              isDisabled={currentStorage === value}
              onPress={() => setCurrentStorage(value)}
            >
              {value}
            </Button>
          ))}
      </HStack>
    );
  }

  function SortMenu() {
    return (
      <Menu
        trigger={(triggerProps) => (
          <Button {...triggerProps} w="200" h="7" pt={2}>
            {sortBy}
          </Button>
        )}
      >
        {Object.entries(SORT)
          .map(([key, value]) => (
            <Menu.Item key={value} onPress={() => setSortBy(SORT[key])}>
              {value}
            </Menu.Item>
          ))}
      </Menu>
    );
  }

  return (
    <VStack my="4" space={2.5}>
      <StorageButtons />
      <HStack
        space={2}
        mx="auto"
        style={{ alignItems: 'center' }}
      >
        <Text>Sort by:</Text>
        <SortMenu />
      </HStack>
    </VStack>
  );
}
