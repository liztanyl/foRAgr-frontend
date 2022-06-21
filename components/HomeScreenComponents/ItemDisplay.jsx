import React, { useState, useEffect } from 'react';
import moment from 'moment';
import {
  Box,
  Text,
  Badge,
  VStack,
  HStack,
  FlatList,
  Spacer,
} from 'native-base';
import { useFridgeContext } from '../FridgeContext';
import { SORT, sortItems } from './helpers';

export default function ItemDisplay({ currentStorage, sortBy }) {
  const { fridgeItems } = useFridgeContext();
  const [items, setItems] = useState(null);

  useEffect(() => {
    let newItems = fridgeItems && [...fridgeItems];
    newItems?.sort((a, b) => sortItems(a, b, 'expiry', 'asc'));
    if (currentStorage !== 'All') {
      newItems = newItems.filter(
        (item) => item.storageMethod === currentStorage
      );
    }
    setItems(newItems);
  }, [currentStorage, fridgeItems]);

  useEffect(() => {
    const newItems = items && [...items];
    switch (sortBy) {
      case SORT.ALPHA_ASC: {
        newItems?.sort((a, b) => sortItems(a, b, 'alpha', 'asc'));
        break;
      }
      case SORT.ALPHA_DESC: {
        newItems?.sort((a, b) => sortItems(a, b, 'alpha', 'desc'));
        break;
      }
      case SORT.ADDED_ASC: {
        newItems?.sort((a, b) => sortItems(a, b, 'added', 'asc'));
        break;
      }
      case SORT.ADDED_DESC: {
        newItems?.sort((a, b) => sortItems(a, b, 'added', 'desc'));
        break;
      }
      case SORT.EXPIRY_DESC: {
        newItems?.sort((a, b) => sortItems(a, b, 'expiry', 'desc'));
        break;
      }
      default: {
        newItems?.sort((a, b) => sortItems(a, b, 'expiry', 'asc'));
        break;
      }
    }
    setItems(newItems);
  }, [sortBy]);

  return (
    <FlatList
      // scrollEnabled="true"
      data={items}
      renderItem={({ item }) => (
        <Box
          borderBottomWidth="1"
          borderColor="coolGray.200"
          pl="4"
          pr="5"
          py="3"
        >
          <HStack space={3} justifyContent="space-between">
            <Text color="coolGray.800" bold fontSize="md">
              {item.name}
            </Text>
            <Spacer />
            <Badge alignSelf="center" colorScheme="warning" variant="solid">
              {`Expires ${moment(item.expiryDate, 'DD-MM-YYYY').fromNow()}`}
            </Badge>
          </HStack>
          <VStack>
            <Text color="coolGray.800" alignSelf="flex-start">
              {item.category}
            </Text>
            <Text color="coolGray.800" alignSelf="flex-start">
              Added: {moment(item.purchaseDate, 'DD-MM-YYYY').fromNow()}
            </Text>
          </VStack>
        </Box>
      )}
      keyExtractor={(item) => `${item.id}-${item.expiryDate}`}
    />
  );
}
