import React, { useEffect, useState } from 'react';
import { Box, Select, Center } from 'native-base';
import { AntDesign } from '@expo/vector-icons';

import { useFridgeContext } from '../../FridgeContext';

export default function DeleteReviewItem({ index }) {
  const {
    reviewItems,
    reviewItemsDispatch,
    dispatchHelpers: { addReviewItems, editReviewItem, removeReviewItem },
  } = useFridgeContext();

  const handleDeleteReviewItem = (index) => {
    reviewItemsDispatch(removeReviewItem(index));
  };

  return (
    <Box>
      <AntDesign.Button
        name="closesquare"
        size={24}
        color="black"
        onPress={() => {
          handleDeleteReviewItem(index);
        }}
      />
    </Box>
  );
}
