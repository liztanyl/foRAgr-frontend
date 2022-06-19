import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Box, ScrollView } from 'native-base';
import { BACKEND_URL } from '../../store.js';
import { useFridgeContext } from '../FridgeContext';
import ItemForm from './ItemReview/ItemForm.jsx';

export default function ItemReview() {
  const reviewItemIds = [31, 49, 3, 4, 5, 58];

  const {
    reviewItems,
    reviewItemsDispatch,
    dispatchHelpers: { addReviewItems, editReviewItem, removeReviewItem },
  } = useFridgeContext();

  useEffect(() => {
    axios
      .get(`${BACKEND_URL}/reviewItems/${reviewItemIds}`)
      .then((response) => {
        console.log(response.data);
        reviewItemsDispatch(addReviewItems(response.data));
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

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
      </ScrollView>
    </Box>
  );
}
