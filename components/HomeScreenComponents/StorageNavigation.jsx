/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/no-unstable-nested-components */
import React from 'react';
import {
  VStack, HStack, Button, Text, Menu,
} from 'native-base';
import { STORAGE, SORT } from './helpers.js';

export default function StorageNavigation({
  currentStorage, setCurrentStorage, sortBy, setSortBy, setIsLoading,
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
              variant={currentStorage === value
                ? 'solid'
                : 'subtle'}
              onPress={() => {
                setCurrentStorage(value);
                setIsLoading(true);
              }}
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
          <Button {...triggerProps} w="200" py={2} variant="outline">
            {sortBy}
          </Button>
        )}
      >
        {Object.entries(SORT)
          .map(([key, value]) => (
            <Menu.Item
              key={value}
              onPress={() => {
                setSortBy(SORT[key]);
                setIsLoading(true);
              }}
            >
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
