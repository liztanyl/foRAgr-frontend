import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Box, Button, ScrollView } from 'native-base';
import moment from 'moment';
import { BACKEND_URL } from '../../store.js';
import { useFridgeContext } from '../FridgeContext';
import ItemForm from './ItemReview/ItemForm.jsx';
import NoItemsToReview from './ItemReview/NoItemsToReview.jsx';

export default function ItemReview({ navigation }) {
  // const reviewItemIds = [31, 49, 3, 4, 5, 58, 90, 123];

  const {
    reviewIds,
    reviewIdsDispatch,
    reviewItems,
    reviewItemsDispatch,
    fridgeDispatch,
    dispatchHelpers: {
      removeReviewIds,
      addReviewItems,
      editReviewItem,
      removeReviewItem,
      removeReviewItems,
      addFridgeItems,
    },
  } = useFridgeContext();

  useEffect(() => {
    // console.log(reviewIds);
    try {
      reviewIds &&
        reviewIds.length > 0 &&
        axios
          .get(`${BACKEND_URL}/reviewItems/${reviewIds}`)
          .then((response) => {
            console.log(response.data);
            reviewItemsDispatch(addReviewItems(response.data));
            reviewIdsDispatch(removeReviewIds());
          })
          .catch((err) => {
            console.log(err);
          });
    } catch (err) {
      console.log(err);
    }
  }, []);

  const allFieldsFilled = (reviewItems) => {
    let fieldsFilled = true;
    reviewItems.forEach((item) => {
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

  const formatReviewItems = (reviewItems) => {
    const formattedReviewItems = reviewItems.map((reviewItem) => {
      return {
        userId: 1, // TO CHANGE AFTER ADDING USER LOGIN / AUTHENTICATION
        shelfLifeItemId: reviewItem.id,
        name: reviewItem.name,
        addedOn: moment(reviewItem.purchaseDate, 'DD-MM-YYYY').toDate(),
        expiry: moment(reviewItem.expiryDate, 'DD-MM-YYYY').toDate(),
        notes: 'add this in later', // TO ADD NOTES INPUT COMPONENT
        price: 10,
      };
    });

    return formattedReviewItems;
  };

  const handleAddToFridge = () => {
    if (allFieldsFilled(reviewItems)) {
      console.log('all fields filled');
      fridgeDispatch(addFridgeItems(reviewItems));

      const dataToBackend = formatReviewItems(reviewItems);

      axios
        .post(`${BACKEND_URL}/fridgeItems/addItems`, dataToBackend)
        .then((response) => {
          console.log(response);
          reviewItemsDispatch(removeReviewItems());
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
    <Box>
      <ScrollView
        maxW="500"
        h="700"
        _contentContainerStyle={{
          px: '20px',
          mb: '4',
          minW: '72',
        }}
      >
        {reviewItems &&
          reviewItems.map((item, index) => (
            <ItemForm item={item} key={item.id} index={index} />
          ))}
        {reviewItems && (
          <Button onPress={handleAddToFridge}>Add to Fridge</Button>
        )}
        {(!reviewItems || reviewItems.length === 0) && (
          <NoItemsToReview navigation={navigation} />
        )}
      </ScrollView>
    </Box>
  );
}
