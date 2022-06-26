import React, { useEffect, useState, useRef } from 'react';
import { Platform } from 'react-native';
import {
  Box, Button, ScrollView, Center, VStack, useToast,
} from 'native-base';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import LottieView from 'lottie-react-native';
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
import displayToast from '../displayToast.jsx';

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
  const toast = useToast();

  const animation = useRef(null);

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
          displayToast(toast, 'Your fridge has been restocked!', 'secondary.600');
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      displayToast(toast, 'Fill in all highlighted fields to proceed', 'tertiary.600');
    }
  };

  return (
    <Box style={{
      height: '100%', alignItems: 'center', justifyContent: 'center', padding: 10,
    }}
    >
      {reviewIds && (
        <Center height="100%" width="100%">
          <LottieView
            autoPlay
            ref={animation}
            style={{
              width: '50%',
              backgroundColor: 'transparent',
            }}
        // Find more Lottie files at https://lottiefiles.com/featured
            source={require('../../assets/dairyLoader.json')}
          />
          <Text textAlign="center" fontSize="md" color="secondary.800"> Loading... </Text>
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
