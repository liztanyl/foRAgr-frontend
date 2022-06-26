import React, { useEffect } from 'react';
import {
  Box, Text, VStack, HStack, FlatList, Spacer,
} from 'native-base';
import moment from 'moment';
import ExpiryDateBadge, { setDays } from './ExpiryDateBadge.jsx';
import RemoveItemButton from './RemoveItemButton.jsx';
import ExtendExpiry from './ExtendExpiry.jsx';
import { SORT, sortItems } from './helpers.js';

export default function ItemList({
  items, setItems, sortBy,
}) {
  useEffect(() => {
    const newItems = items ? [...items] : [];
    switch (sortBy) {
      case SORT.ALPHA_ASC: {
        newItems.sort((a, b) => sortItems(a, b, 'alpha', 'asc'));
        break;
      }
      case SORT.ALPHA_DESC: {
        newItems.sort((a, b) => sortItems(a, b, 'alpha', 'desc'));
        break;
      }
      case SORT.ADDED_ASC: {
        newItems.sort((a, b) => sortItems(a, b, 'added', 'asc'));
        break;
      }
      case SORT.ADDED_DESC: {
        newItems.sort((a, b) => sortItems(a, b, 'added', 'desc'));
        break;
      }
      case SORT.EXPIRY_DESC: {
        newItems.sort((a, b) => sortItems(a, b, 'expiry', 'desc'));
        break;
      }
      default: {
        newItems.sort((a, b) => sortItems(a, b, 'expiry', 'asc'));
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
            <Text color="coolGray.800" bold fontSize="md" textTransform="capitalize">
              {item.name}
            </Text>
            <Spacer />
            <ExpiryDateBadge expiryDate={item.expiryDate} />
          </HStack>
          <VStack>
            <Text
              alignSelf="flex-start"
              fontWeight="light"
            >
              {'Category: '}
              {item.category}
            </Text>
            <Text
              alignSelf="flex-start"
              fontWeight="light"
            >
              {'Storage: '}
              {item.storageMethod}
            </Text>
            <Text
              alignSelf="flex-start"
              fontWeight="light"
            >
              {'Added: '}
              {setDays(item.purchaseDate)}
            </Text>
            {item.notes !== ''
              && (
                <Text>
                  {'Remarks: '}
                  {item.notes}
                </Text>
              )}
          </VStack>
          <HStack space={3}>
            <RemoveItemButton itemId={item.id} itemName={item.name} />
            {(moment(item.expiryDate).diff(new Date(), 'days') < 4) && <ExtendExpiry expiry={item.expiryDate} itemId={item.id} /> }
          </HStack>
        </Box>
      )}
      keyExtractor={(item) => `${item.id}`}
    />
  );
}
