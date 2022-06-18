import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Box, ScrollView } from 'native-base';
import { BACKEND_URL } from '../../store.js';
import { useFridgeContext } from '../FridgeContext.js';
import ItemForm from './ItemReview/ItemForm.jsx';

export default function ItemReview() {
  const { reviewState, reviewDispatch, reviewDispatchHelpers } =
    useFridgeContext();

  const [reviewItems, setReviewItems] = useState([]);
  // const { reviewItemIds } = reviewState;
  const reviewItemIds = [31, 49, 3, 4, 5];

  useEffect(() => {
    axios
      .get(`${BACKEND_URL}/reviewItems/${reviewItemIds}`)
      .then((response) => {
        console.log(response.data);
        setReviewItems(response.data);
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
          reviewItems.map((item) => <ItemForm item={item} key={item.id} />)}
      </ScrollView>
    </Box>
  );
}
