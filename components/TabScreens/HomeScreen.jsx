import React, { useState, useEffect } from 'react';
import { View } from 'react-native';
import { Box } from 'native-base';
import { useFridgeContext } from '../FridgeContext.jsx';
import moment from 'moment';

const SORT_TYPE = {
  ALPHABETICAL: 'alphabetical',
  EXPIRY: 'expiry',
  CATEGORY: 'category',
  STORAGE: 'storage',
};

export default function HomeScreen() {
  const [sortType, setSortType] = useState(SORT_TYPE.ALPHABETICAL);
  const { fridgeItems } = useFridgeContext();

  const sortFridgeItems = (fridgeItems) => {
    const { ALPHABETICAL, EXPIRY, CATEGORY, STORAGE } = SORT_TYPE;
    switch (sortType) {
      case ALPHABETICAL: {
        fridgeItems &&
          fridgeItems.sort((a, b) => {
            const itemA = a.id;
            const itemB = b.id;
            if (itemA < itemB) {
              return -1;
            }
            if (itemA > itemB) {
              return 1;
            }
            return 0;
          });
        console.log('sorted by name');
        console.log(fridgeItems);
      }
      case EXPIRY: {
        // convert time from present till expiry > sort by ascending order
        fridgeItems &&
          fridgeItems.sort((a, b) => {
            return (
              moment(a.expiryDate, 'DD-MM-YYYY').diff(new Date(), 'days') -
              moment(b.expiryDate, 'DD-MM-YYYY').diff(new Date(), 'days')
            );
          });
        console.log('sorted by expiry');
        console.log(fridgeItems);
        break;
      }
      case CATEGORY: {
        fridgeItems &&
          fridgeItems.sort((a, b) => {
            const itemA = a.category;
            const itemB = b.category;
            if (itemA < itemB) {
              return -1;
            }
            if (itemA > itemB) {
              return 1;
            }
            return 0;
          });
        console.log('sorted by category');
        console.log(fridgeItems);
        break;
      }
      case STORAGE: {
        fridgeItems &&
          fridgeItems.sort((a, b) => {
            const itemA = a.storageMethod;
            const itemB = b.storageMethod;
            if (itemA < itemB) {
              return -1;
            }
            if (itemA > itemB) {
              return 1;
            }
            return 0;
          });
        console.log('sorted by storage');
        console.log(fridgeItems);
        break;
      }
      default:
        console.log('invalid sort type');
    }
  };

  useEffect(() => {
    console.log(fridgeItems);
    sortFridgeItems(fridgeItems);
  }, [fridgeItems]);

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Box>Home Screen! wowwweee nice cool</Box>
      {/* <Box>{fridgeItems.map((item) => {

      })}</Box> */}
    </View>
  );
}
