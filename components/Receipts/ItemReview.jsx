import React, { useEffect, useState } from 'react';
import { Platform } from 'react-native';
import {
  Box, Button, ScrollView, Spinner, Center, VStack,
} from 'native-base';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import axios from 'axios';
import moment from 'moment';
import 'react-native-get-random-values';
import { v4 as uuidv4 } from 'uuid';

import { BACKEND_URL } from '../../store.js';
import { useFridgeContext } from '../FridgeContext.jsx';
import { useUserContext } from '../UserContext.jsx';
import ItemForm from './ItemReview/ItemForm.jsx';
import NoItemsToReview from './ItemReview/NoItemsToReview.jsx';
import setNotification from '../NotificationComponent/setNotification.js';

export default function ItemReview({ navigation }) {
  const {
    reviewIds,
    reviewIdsDispatch,
    reviewItems,
    reviewItemsDispatch,
    fridgeDispatch,
    dispatchHelpers: {
      removeReviewIds,
      addReviewItems,
      removeReviewItems,
      addFridgeItems,
    },
  } = useFridgeContext();
  const { jwtToken } = useUserContext();
  const [isAdding, setIsAdding] = useState(false);

  useEffect(() => {
    try {
      if (reviewIds && reviewIds.length > 0) {
        axios
          .get(`${BACKEND_URL}/reviewItems/${reviewIds}`)
          .then((response) => {
            const items = response.data;
            items.forEach((item) => {
              item.id = uuidv4();
            });
            reviewItemsDispatch(addReviewItems(items));
            reviewIdsDispatch(removeReviewIds());
          })
          .catch((err) => {
            console.log(err);
          });
      }
    } catch (err) {
      console.log(err);
    }
  }, []);

  const areAllFieldsFilled = (items) => {
    let fieldsFilled = true;
    items.forEach((item) => {
      [
        'category',
        'storageMethod',
        'purchaseDate',
        'expiryDate',
        'shelfLifeDays',
      ].forEach((key) => {
        if (!item[key]) {
          fieldsFilled = false;
        }
      });
    });
    return fieldsFilled;
  };

  const formatReviewItems = (items) => items.map((item) => ({
    userId: '',
    shelfLifeItemId: item.shelfLifeItemId,
    addedOn: moment(item.purchaseDate, 'DD-MM-YYYY').toDate(),
    expiry: moment(item.expiryDate, 'DD-MM-YYYY').toDate(),
    notes: item.notes,
  }));

  const handleAddToFridge = () => {
    if (areAllFieldsFilled(reviewItems)) {
      setIsAdding(true);
      console.log('all fields filled');
      const items = formatReviewItems(reviewItems);
      const dataToBackend = {
        items,
        userToken: jwtToken,
      };
      console.log('data to backend', dataToBackend);
      axios
        .post(`${BACKEND_URL}/fridgeItems/add`, dataToBackend)
        .then((response) => {
          const addedItems = response.data;
          reviewItemsDispatch(removeReviewItems());
          fridgeDispatch(addFridgeItems(addedItems));
          if (Platform.OS !== 'web') {
            addedItems.forEach((item) => setNotification(item, jwtToken));
          }
          setIsAdding(false);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      console.log('fields not filled');
      // SNACKBAR TO INDICATE EMPTY FIELD?
    }
  };

  return (
    <Box style={{
      height: '100%', alignItems: 'center', justifyContent: 'center', padding: 10,
    }}
    >
      {reviewIds && (
        <Center height="100%" width="100%">
          <Spinner size="lg" />
        </Center>
      )}
      {!reviewIds && (!reviewItems || reviewItems.length === 0) && (
      <NoItemsToReview navigation={navigation} />
      )}
      {!reviewIds && reviewItems && (
        <ScrollView width="100%">
          <Box padding={2}>
            <VStack space={5}>
              {reviewItems.map((item) => (
                <ItemForm key={item.id} item={item} />
              ))}
            </VStack>
            <Button
              margin={4}
              marginTop={8}
              paddingLeft={5}
              paddingRight={5}
              alignSelf="flex-end"
              colorScheme="primary"
              _text={{ fontSize: 'lg' }}
              onPress={handleAddToFridge}
              endIcon={
                <MaterialCommunityIcons name="chevron-right-circle" size={24} color="white" />
              }
              isLoading={isAdding}
              isLoadingText="Adding to fridge"
              spinnerPlacement="end"
            >
              Add to Fridge
            </Button>
          </Box>
        </ScrollView>
      )}
    </Box>
  );
}
