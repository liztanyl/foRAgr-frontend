import React, { useState, useEffect } from 'react';
import {
  Box, Text, VStack, HStack, FlatList, Spacer,
} from 'native-base';
import moment from 'moment';
import { useFridgeContext } from '../FridgeContext.jsx';
import { SORT, sortItems } from './helpers.js';
import ExpiryDateBadge, { setDays } from './ExpiryDateBadge.jsx';
import RemoveItemButton from './RemoveItemButton.jsx';
import ExtendExpiry from './ExtendExpiry.jsx';

export default function ItemDisplay({ currentStorage, sortBy }) {
  const { fridgeItems } = useFridgeContext();
  const [items, setItems] = useState(null);
  useEffect(() => {
    let newItems = fridgeItems && [...fridgeItems];
    if (currentStorage !== 'All') {
      newItems = newItems.filter((item) => item.storageMethod === currentStorage);
    }
    newItems?.sort((a, b) => sortItems(a, b, 'expiry', 'asc'));
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
            <ExpiryDateBadge expiryDate={item.expiryDate} />
          </HStack>
          <VStack>
            <Text color="coolGray.800" alignSelf="flex-start">
              {item.category}
            </Text>
            <Text
              color="coolGray.800"
              alignSelf="flex-start"
            >
              Added:
              {setDays(item.purchaseDate)}
            </Text>
            <RemoveItemButton itemId={item.id} />
            {(moment(item.expiryDate).diff(new Date(), 'days') < 4) && <ExtendExpiry expiry={item.expiryDate} /> }
          </VStack>
        </Box>
      )}
      keyExtractor={(item) => `${item.id}-${item.expiryDate}`}
    />
  );
}
